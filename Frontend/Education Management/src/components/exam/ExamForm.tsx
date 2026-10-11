import { useEffect, useState } from "react";
import axios from "axios";

import { Exam } from "../../data/exam";

interface Class {
  _id: string;
  name: string;
}

interface Subject {
  _id: string;
  name: string;
}

interface ClassResponse {
  success: boolean;
  data: Class[];
}

interface SubjectResponse {
  success: boolean;
  data: Subject[];
}

export interface ExamFormData {
  title: string;
  examType: string;
  classId: string;
  subjectId: string;
  examDate: string;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
  roomNumber: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

interface ExamFormProps {
  onSave: (data: ExamFormData) => void;
  editingExam: Exam | null;
  onClose: () => void;
}

const initialExam: ExamFormData = {
  title: "",
  examType: "",
  classId: "",
  subjectId: "",
  examDate: "",
  startTime: "",
  endTime: "",
  totalMarks: 100,
  passingMarks: 33,
  roomNumber: "",
  status: "upcoming",
};

function ExamForm({
  onSave,
  editingExam,
  onClose,
}: ExamFormProps) {
  const [formData, setFormData] =
    useState<ExamFormData>(initialExam);

  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [loadingClasses, setLoadingClasses] =
    useState(false);

  const [loadingSubjects, setLoadingSubjects] =
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
      console.error("Get classes error:", error);
    } finally {
      setLoadingClasses(false);
    }
  };

  // =========================
  // GET SUBJECTS
  // =========================

  const getSubjects = async () => {
    try {
      setLoadingSubjects(true);

      const res = await axios.get<SubjectResponse>(
        "http://localhost:5000/api/subject"
      );

      setSubjects(res.data.data);
    } catch (error) {
      console.error("Get subjects error:", error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  // =========================
  // LOAD DROPDOWNS
  // =========================

  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  // =========================
  // EDIT DATA
  // =========================

  useEffect(() => {
    if (editingExam) {
      setFormData({
        title: editingExam.title || "",
        examType: editingExam.examType || "",

        classId:
          editingExam.classId?._id || "",

        subjectId:
          editingExam.subjectId?._id || "",

        examDate: editingExam.examDate
          ? new Date(editingExam.examDate)
              .toISOString()
              .split("T")[0]
          : "",

        startTime: editingExam.startTime || "",
        endTime: editingExam.endTime || "",

        totalMarks:
          editingExam.totalMarks || 0,

        passingMarks:
          editingExam.passingMarks || 0,

        roomNumber:
          editingExam.roomNumber || "",

        status:
          editingExam.status || "upcoming",
      });
    } else {
      setFormData(initialExam);
    }
  }, [editingExam]);

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
      [name]:
        name === "totalMarks" ||
        name === "passingMarks"
          ? Number(value)
          : value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("EXAM FORM DATA:", formData);

    onSave(formData);
  };

  return (
    <div className="mb-5 rounded-lg border bg-white p-5 shadow">

      <h2 className="mb-5 text-xl font-bold">
        {editingExam
          ? "Edit Exam"
          : "Add Exam"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >

        {/* TITLE */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Exam Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter exam title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>

        {/* EXAM TYPE */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Exam Type
          </label>
  <select
    name="examType"
    value={formData.examType}
    onChange={handleChange}
    className="w-full rounded border p-2"
    required
  >
    <option value="">Select Exam Type</option>
    <option value="Unit Test">Unit Test</option>
  <option value="Monthly">Monthly</option>
  <option value="Half Yearly">Half Yearly</option>
  <option value="Final">Final</option>
  <option value="Practical">Practical</option>
  </select>
        </div>

        {/* CLASS */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Class
          </label>

          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="w-full rounded border p-2"
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
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* SUBJECT */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Subject
          </label>

          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            className="w-full rounded border p-2"
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

        {/* EXAM DATE */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Exam Date
          </label>

          <input
            type="date"
            name="examDate"
            value={formData.examDate}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>

        {/* START TIME */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Start Time
          </label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>

        {/* END TIME */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            End Time
          </label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>

        {/* TOTAL MARKS */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Total Marks
          </label>

          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
            className="w-full rounded border p-2"
            min="1"
            required
          />
        </div>

        {/* PASSING MARKS */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Passing Marks
          </label>

          <input
            type="number"
            name="passingMarks"
            value={formData.passingMarks}
            onChange={handleChange}
            className="w-full rounded border p-2"
            min="0"
            required
          />
        </div>

        {/* ROOM */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Room Number
          </label>

          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        </div>

        {/* STATUS */}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border p-2"
          >
            <option value="upcoming">
              Upcoming
            </option>

            <option value="ongoing">
              Ongoing
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>

        {/* BUTTONS */}

        <div className="flex gap-3 md:col-span-2">

          <button
            type="submit"
            disabled={
              loadingClasses ||
              loadingSubjects
            }
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {editingExam
              ? "Update"
              : "Save"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Close
          </button>

        </div>

      </form>
    </div>
  );
}

export default ExamForm;