import { useEffect, useState } from "react";

export interface NoticeFormData {
  title: string;
  message: string;
  audience: string;
  createdBy: string;
}

interface NoticeFormProps {
  onSave: (notice: NoticeFormData) => void;
  editingNotice: NoticeFormData | null;
  onClose: () => void;
}

const initialNotice: NoticeFormData = {
  title: "",
  message: "",
  audience: "",
  createdBy: "",
};

function NoticeForm({
  onSave,
  editingNotice,
  onClose,
}: NoticeFormProps) {
  const [formData, setFormData] =
    useState<NoticeFormData>(initialNotice);

  // EDIT
  useEffect(() => {
    if (!editingNotice) {
      setFormData(initialNotice);
      return;
    }

    setFormData({
      title: editingNotice.title || "",
      message: editingNotice.message || "",
      audience: editingNotice.audience || "",
      createdBy: editingNotice.createdBy || "",
    });
  }, [editingNotice]);

  // COMMON HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("NOTICE FORM DATA:", formData);

    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">

      <h2 className="text-xl font-bold mb-5">
        {editingNotice ? "Edit Notice" : "Add Notice"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* TITLE */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notice title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* MESSAGE */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Message
          </label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter notice message"
            rows={5}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* AUDIENCE */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Audience
          </label>

          <select
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">
              Select Audience
            </option>

            <option value="all">
              All
            </option>

            <option value="student">
              Students
            </option>

            <option value="teacher">
              Teachers
            </option>
          </select>
        </div>

        {/* CREATED BY */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Created By
          </label>

          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            placeholder="Enter creator"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* BUTTONS */}

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {editingNotice
              ? "Update Notice"
              : "Save Notice"}
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

export default NoticeForm;