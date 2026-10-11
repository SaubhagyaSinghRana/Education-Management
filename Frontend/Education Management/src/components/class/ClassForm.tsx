import { useEffect, useState } from "react";
import { Class } from "../../data/classes";

interface ClassFormProps {
  onSave: (data: Class) => void;
  editingClass: Class | null;
  onClose: () => void;
}

const initialClass: Class = {
  _id: "",
  name: "",
  section: "",
  status: "active",
};

function ClassForm({
  onSave,
  editingClass,
  onClose,
}: ClassFormProps) {
  const [formData, setFormData] = useState<Class>(initialClass);

  useEffect(() => {
    if (editingClass) {
      setFormData(editingClass);
    } else {
      setFormData(initialClass);
    }
  }, [editingClass]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("CLASS FORM DATA:", formData);

    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-5">
        {editingClass ? "Edit Class" : "Add Class"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Class Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Class Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter class name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Section */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Section
          </label>

          <input
            type="text"
            name="section"
            placeholder="Enter section"
            value={formData.section}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 items-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {editingClass ? "Update" : "Save"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClassForm;