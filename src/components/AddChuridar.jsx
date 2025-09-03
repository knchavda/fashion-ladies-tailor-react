import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import CustomSelect from "./CustomSelect";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useOptions } from "../context/options";

export default function AddChuridar({
  onBack,
  hasCustomer,
  setHasCustomer,
  setMode,
  mode,
}) {
  const fields = ["Length", "Knee length", "Knee round", "Calf", "Bottom"];

  const [formData, setFormData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const { options } = useOptions();

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  useEffect(() => {
    if (hasCustomer?.data && mode?.type === "edit") {
      setFormData(hasCustomer?.data);
      const findCustomer = options?.find(
        (item) => item?.value === hasCustomer.id
      );
      setSelectedUser(findCustomer);
    } else {
      setHasCustomer(null);
      setMode(null);
    }
  }, [hasCustomer]);

  const handleSubmit = async () => {
    const isValid = fields.every((field) => {
      return formData?.[field] && formData[field].trim() !== "";
    });

    if (!isValid) {
      toast.warning("All fields required!");
      return;
    }
    try {
      if (!selectedUser?.value) {
        toast.error("Please select a user first!");
        return;
      }

      if (mode?.type === "edit" && hasCustomer?.id) {
        await updateDoc(doc(db, "customers", hasCustomer.id), {
          churidarInfo: { ...formData },
          updatedAt: new Date(),
        });
        toast.success("Churidar data updated successfully!");
        setHasCustomer(null);
        setMode(null);
        setFormData({});
        onBack();
      } else {
        const userRef = doc(db, "customers", selectedUser.value);

        await updateDoc(userRef, {
          churidarInfo: { ...formData },
          updatedAt: new Date(),
        });

        toast.success("Chruidar data saved successfully!");
        setFormData({});
        onBack();
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-50 px-4 py-6">
      {/* Header with Back button */}
      <div className="w-full max-w-md flex items-center mb-4 card p-3">
        <FiArrowLeft
          onClick={onBack}
          className="text-sky-700 text-2xl cursor-pointer"
        />
        <h2 className="flex-1 text-xl font-bold text-sky-700 text-center">
          Add Churidar Measurement
        </h2>
      </div>

      {/* Card Section */}
      <div className="card w-full max-w-md p-4 shadow-lg bg-white rounded-xl">
        <div className="mb-2">
          <CustomSelect
            label={"Select Customer"}
            required={true}
            onChange={(e) => setSelectedUser(e)}
            value={selectedUser}
          />
        </div>
        <div className="space-y-4">
          {fields?.map((field, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                {field} {true && <span className="text-red-500">*</span>}
              </label>{" "}
              <input
                type="number"
                placeholder={`Enter ${field}`}
                className="input"
                value={formData[field] || ""}
                onChange={(e) => handleChange(e, field)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="btn bg-sky-500 hover:bg-sky-600 text-white w-full"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
