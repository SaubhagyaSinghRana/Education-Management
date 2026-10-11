import { useEffect, useState } from "react";
import axios from "axios";

import { Student } from "../../data/students";

export interface StudentFormData {
  name: string;
  email: string;
  phone: string;
  rollNo: string | number;
  fatherName: string;
  motherName: string;
  classId: string;
  address: string;
  status:
    | "active"
    | "inactive"
    | "pending"
    | "deleted";
}

interface Class {
  _id: string;
  name: string;
  section: string;
}

interface ClassResponse {
  success: boolean;
  data: Class[];
}

interface StudentFormProps {
  onSave: (student: StudentFormData) => void;
  editingStudent: Student | null;
  onClose: () => void;
}

const initialStudent: StudentFormData = {
  name: "",
  email: "",
  phone: "",
  rollNo: 0,
  fatherName: "",
  motherName: "",
  classId: "",
  address: "",
  status: "active",
};

function StudentForm({
  onSave,
  editingStudent,
  onClose,
}: StudentFormProps) {
  const [formData, setFormData] =
    useState<StudentFormData>(initialStudent);

  const [classes, setClasses] =
    useState<Class[]>([]);

  const [loadingClasses, setLoadingClasses] =
    useState(false);

  // GET CLASSES


  const getClasses = async () => {
    try {
      setLoadingClasses(true);

      const res = await axios.get<ClassResponse>(
        "http://localhost:5000/api/class"
      );

      setClasses(res.data.data);
    } catch (error) {
      console.error(
        "Get classes error:",
        error
      );
    } finally {
      setLoadingClasses(false);
    }
  };

  // =========================
  // LOAD CLASSES
  // =========================

  useEffect(() => {
    getClasses();
  }, []);

  // =========================
  // EDIT DATA
  // =========================

  useEffect(() => {
    if (!editingStudent) {
      setFormData(initialStudent);
      return;
    }

    console.log(
      "EDIT STUDENT:",
      editingStudent
    );

    const classId =
      typeof editingStudent.classId === "object"
        ? editingStudent.classId?._id || ""
        : editingStudent.classId || "";

    setFormData({
      name: editingStudent.name || "",
      email: editingStudent.email || "",
      phone: editingStudent.phone || "",

      rollNo:
        editingStudent.rollNo ?? 0,

      fatherName:
        editingStudent.fatherName || "",

      motherName:
        editingStudent.motherName || "",

      classId: classId,

      address:
        editingStudent.address || "",

      status:
        editingStudent.status || "active",
    });
  }, [editingStudent]);

  // INPUT CHANGE

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        name === "rollNo"
          ? Number(value)
          : value,
    }));
  };

  // SUBMIT

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(
      "STUDENT FORM DATA:",
      formData
    );

    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">

      <h2 className="text-xl font-bold mb-5">
        {editingStudent
          ? "Edit Student"
          : "Add Student"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >

        {/* NAME */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Student Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* EMAIL */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* PHONE */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* ROLL NO */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Roll Number
          </label>

          <input
            type="number"
            name="rollNo"
            placeholder="Enter roll number"
            value={
              formData.rollNo === 0
                ? ""
                : formData.rollNo
            }
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* FATHER */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Father Name
          </label>

          <input
            type="text"
            name="fatherName"
            placeholder="Enter father name"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* MOTHER */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Mother Name
          </label>

          <input
            type="text"
            name="motherName"
            placeholder="Enter mother name"
            value={formData.motherName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* CLASS */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Class
          </label>

          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">
              {loadingClasses
                ? "Loading classes..."
                : "Select Class"}
            </option>

            {classes.map((cls) => (
              <option
                key={cls._id}
                value={cls._id}
              >
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>
        </div>

        {/* STATUS */}

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

        {/* ADDRESS */}

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">
            Address
          </label>

          <textarea
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />
        </div>

        {/* BUTTONS */}

        <div className="flex gap-3 col-span-2">

          <button
            type="submit"
            disabled={loadingClasses}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {editingStudent
              ? "Update Student"
              : "Save Student"}
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

export default StudentForm;