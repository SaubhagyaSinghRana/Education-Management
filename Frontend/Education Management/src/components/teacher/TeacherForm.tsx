import { useState, useEffect } from "react";
import axios from "axios";

import { Teacher } from "../../data/teachers";
import { Subject } from "../../data/subjects";

export interface TeacherFormData {
  name: string;
  email: string;
  phone: string;
  subjectId: string;
  classId: string;
  joiningDate: string;
  status: "active" | "inactive" | "pending" | "deleted";
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

interface SubjectResponse {
  success: boolean;
  data: Subject[];
}

interface TeacherFormProps {
  onSave: (teacher: TeacherFormData) => void;
  editingTeacher: Teacher | null;
  onClose: () => void;
}

const initialTeacher: TeacherFormData = {
  name: "",
  email: "",
  phone: "",
  subjectId: "",
  classId: "",
  joiningDate: "",
  status: "active",
};

function TeacherForm({
  onSave,
  editingTeacher,
  onClose,
}: TeacherFormProps) {
  const [formData, setFormData] =
    useState<TeacherFormData>(initialTeacher);

  const [classes, setClasses] = useState<Class[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(false);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  // =========================
  // Get Classes
  // =========================
  const getClasses = async () => {
    try {
      setLoadingClasses(true);

      const res = await axios.get<ClassResponse>(
        "http://localhost:5000/api/class"
      );

      setClasses(res.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoadingClasses(false);
    }
  };

  // =========================
  // Get Subjects
  // =========================
  const getSubjects = async () => {
    try {
      setLoadingSubjects(true);

      const res = await axios.get<SubjectResponse>(
        "http://localhost:5000/api/subject"
      );

      setSubjects(res.data.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  // =========================
  // Load dropdown data
  // =========================
  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  // =========================
  // Edit Data Load
  // =========================
  useEffect(() => {
    if (editingTeacher) {
      setFormData({
        name: editingTeacher.name || "",
        email: editingTeacher.email || "",
        phone: editingTeacher.phone || "",

        subjectId:
          typeof editingTeacher.subjectIds === "object"
            ? editingTeacher.subjectIds[0]?._id || ""
            : editingTeacher.subjectIds || "",

        classId:
          typeof editingTeacher.classIds === "object"
            ? editingTeacher.classIds[0]?._id || ""
            : editingTeacher.classIds || "",

        joiningDate: editingTeacher.joiningDate
          ? new Date(editingTeacher.joiningDate)
              .toISOString()
              .split("T")[0]
          : "",

        status: editingTeacher.status || "active",
      });
    } else {
      setFormData(initialTeacher);
    }
  }, [editingTeacher]);

  // =========================
  // Input Change
  // =========================
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
      [name]: value,
    }));
  };

  // =========================
  // Submit
  // =========================
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("FORM DATA:", formData);

    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">

      <h2 className="text-xl font-bold mb-5">
        {editingTeacher
          ? "Edit Teacher"
          : "Add Teacher"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Teacher Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter teacher name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Email */}
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

        {/* Phone */}
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

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Subject
          </label>

          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">
              {loadingSubjects
                ? "Loading subjects..."
                : "Select Subject"}
            </option>

            {subjects.map((subject) => (
              <option
                key={subject._id}
                value={subject._id}
              >
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Class */}
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

        {/* Joining Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Joining Date
          </label>

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
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
        <div className="flex gap-3 col-span-2">

          <button
            type="submit"
            disabled={
              loadingClasses || loadingSubjects
            }
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {editingTeacher
              ? "Update Teacher"
              : "Save Teacher"}
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

export default TeacherForm;