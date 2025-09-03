import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { fetchUsers } from "../utils/helper";
import { useOptions } from "../context/options";

export default function AddPersonal({ onBack }) {
  const fields = ["First Name", "Last Name", "Contact Number"];
  const { setOptions } = useOptions();

  const [formData, setFormData] = useState({});

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    const isValid = fields.every((field) => {
      return formData?.[field] && formData[field].trim() !== "";
    });

    if(!isValid) {
      toast.warning("All fields required!");
      return
    }

    try {
      await addDoc(collection(db, "customers"), {
        personalInfo: { ...formData },
        createdAt: new Date(),
      });
      toast.success("Personal data saved successfully!");
      const allCustomers = await fetchUsers();
      setOptions(allCustomers);
      setFormData({});
      onBack();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add user");
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
          Add Personal Details
        </h2>
      </div>

      {/* Card Section */}
      <div className="card w-full max-w-md p-4 shadow-lg bg-white rounded-xl">
        <div className="space-y-4">
          {fields.map((field, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                {field} {true && <span className="text-red-500">*</span>}
              </label>{" "}
              <input
                type="text"
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
