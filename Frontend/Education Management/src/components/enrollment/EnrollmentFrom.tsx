import { useEffect, useState } from "react";
import axios from "axios";

import { Enrollments } from "../../data/enrollments";

export interface EnrollmentFormData {
  enrollmentNumber: string;
  studentId: string;
  classId: string;
  enrollmentDate: string;
  status: "active" | "inactive" | "pending" | "deleted";
}

interface Student {
  _id: string;
  name: string;
}

interface Class {
  _id: string;
  name: string;
  section: string;
}

interface StudentResponse {
  success: boolean;
  data: Student[];
}

interface ClassResponse {
  success: boolean;
  data: Class[];
}

interface EnrollmentFormProps {
  onSave: (enrollment: EnrollmentFormData) => void;
  editingEnrollment: Enrollments | null;
  onClose: () => void;
}

const initialEnrollment: EnrollmentFormData = {
  enrollmentNumber: "",
  studentId: "",
  classId: "",
  enrollmentDate: "",
  status: "pending",
};

function EnrollmentForm({
  onSave,
  editingEnrollment,
  onClose,
}: EnrollmentFormProps) {
  const [formData, setFormData] =
    useState<EnrollmentFormData>(initialEnrollment);

  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);

  // =========================
  // GET STUDENTS
  // =========================

  const getStudents = async () => {
    try {
      setLoadingStudents(true);

      const res = await axios.get<StudentResponse>(
        "http://localhost:5000/api/student"
      );

      setStudents(res.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  // =========================
  // GET CLASSES
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
  // LOAD DATA
  // =========================

  useEffect(() => {
    getStudents();
    getClasses();
  }, []);

  // =========================
  // EDIT DATA
  // =========================

  useEffect(() => {
    if (editingEnrollment) {
      setFormData({
        enrollmentNumber:
          editingEnrollment.enrollmentNumber || "",

        studentId:
          typeof editingEnrollment.studentId === "object"
            ? editingEnrollment.studentId._id
            : editingEnrollment.studentId,

        classId:
          typeof editingEnrollment.classId === "object"
            ? editingEnrollment.classId._id
            : editingEnrollment.classId,

        enrollmentDate: editingEnrollment.enrollmentDate
          ? new Date(editingEnrollment.enrollmentDate)
              .toISOString()
              .split("T")[0]
          : "",

        status: editingEnrollment.status || "pending",
      });
    } else {
      setFormData(initialEnrollment);
    }
  }, [editingEnrollment]);

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

    console.log("ENROLLMENT FORM DATA:", formData);

    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">

      <h2 className="text-xl font-bold mb-5">
        {editingEnrollment
          ? "Edit Enrollment"
          : "Add Enrollment"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >

        {/* ENROLLMENT NUMBER */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Enrollment Number
          </label>

          <input
            type="text"
            name="enrollmentNumber"
            placeholder="Enter enrollment number"
            value={formData.enrollmentNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* STUDENT */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Student
          </label>

          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">
              {loadingStudents
                ? "Loading students..."
                : "Select Student"}
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name}
              </option>
            ))}
          </select>
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

        {/* ENROLLMENT DATE */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Enrollment Date
          </label>

          <input
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
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

        {/* BUTTONS */}

        <div className="flex gap-3 col-span-2">

          <button
            type="submit"
            disabled={
              loadingStudents || loadingClasses
            }
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {editingEnrollment
              ? "Update Enrollment"
              : "Save Enrollment"}
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

export default EnrollmentForm;