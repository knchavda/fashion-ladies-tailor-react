import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";
import CustomSelect from "./CustomSelect";

export default function AddPant({ onBack }) {
  const fields = [
    "Length",
    "Knee length",
    "Thigh",
    "Knee round",
    "Bottom",
    "Waist",
  ];

  const [formData, setFormData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

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

      const userRef = doc(db, "customers", selectedUser.value);

      await updateDoc(userRef, {
        pentInfo: { ...formData },
        updatedAt: new Date(),
      });

      toast.success("Pent data updated successfully!");
      setFormData({});
      onBack();
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
          Add Pent Measurement
        </h2>
      </div>

      {/* Card Section */}
      <div className="card w-full max-w-md p-4 shadow-lg bg-white rounded-xl">
        <div className="mb-2">
          <CustomSelect
            label={"Select Customer"}
            required={true}
            setValue={setSelectedUser}
          />
        </div>
        <div className="space-y-4">
          {fields.map((field, i) => (
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
