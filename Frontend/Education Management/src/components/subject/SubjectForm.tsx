import { useEffect, useState } from "react";
import { Subject } from "../../data/subjects";

interface SubjectFormProps {
  onSave: (subject: Subject) => void;
  editingSubject: Subject | null;
  onClose: () => void;
}

const initialSubject: Subject = {
  _id: "",
  name: "",
  code: "",
  status: "active",
};

function SubjectForm({
  onSave,
  editingSubject,
  onClose,
}: SubjectFormProps) {
  const [formData, setFormData] =
    useState<Subject>(initialSubject);

  // =========================
  // EDIT / ADD DATA
  // =========================
  useEffect(() => {
    if (editingSubject) {
      setFormData(editingSubject);
    } else {
      setFormData(initialSubject);
    }
  }, [editingSubject]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("SUBJECT FORM DATA:", formData);

    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">

      <h2 className="text-xl font-bold mb-5">
        {editingSubject
          ? "Edit Subject"
          : "Add Subject"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* Subject Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Subject Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter subject name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Subject Code */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Subject Code
          </label>

          <input
            type="text"
            name="code"
            placeholder="Enter subject code"
            value={formData.code}
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
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="deleted">
              Deleted
            </option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 items-end">

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {editingSubject
              ? "Update"
              : "Save"}
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

export default SubjectForm;