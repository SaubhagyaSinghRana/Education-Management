import { useEffect, useState } from "react";
import axios from "axios";
import { Fees } from "../../data/fees";

export interface FeesFormData {
  studentId: string;
  amount: number;
  dueDate: string;
  paidDate: string;
  status: "active" | "inactive" | "pending" | "deleted";
  paymentMode: "cash" | "online";
}

interface Student {
  _id: string;
  name: string;
}

interface StudentResponse {
  success: boolean;
  data: Student[];
}

interface FeesFormProps {
  onSave: (fees: FeesFormData) => void;
  editingFees: Fees | null;
  onClose: () => void;
}

const initialFees: FeesFormData = {
  studentId: "",
  amount: 0,
  dueDate: "",
  paidDate: "",
  status: "pending",
  paymentMode: "cash",
};

function FeesForm({
  onSave,
  editingFees,
  onClose,
}: FeesFormProps) {
  const [formData, setFormData] =
    useState<FeesFormData>(initialFees);

  const [students, setStudents] =
    useState<Student[]>([]);

  const [loadingStudents, setLoadingStudents] =
    useState(false);

  // GET STUDENTS


  const getStudents = async () => {
    try {
      setLoadingStudents(true);

      const res = await axios.get<StudentResponse>(
        "http://localhost:5000/api/student"
      );

      setStudents(res.data.data);
    } catch (error) {
      console.error("Get students error:", error);
    } finally {
      setLoadingStudents(false);
    }
  };

  // LOAD STUDENTS

  useEffect(() => {
    getStudents();
  }, []);

  // EDIT FEES

  useEffect(() => {
    if (!editingFees) {
      setFormData(initialFees);
      return;
    }

    setFormData({
      studentId: editingFees.studentId?._id || "",

      amount: Number(editingFees.amount) || 0,

      dueDate: editingFees.dueDate
        ? new Date(editingFees.dueDate)
            .toISOString()
            .split("T")[0]
        : "",

      paidDate: editingFees.paidDate
        ? new Date(editingFees.paidDate)
            .toISOString()
            .split("T")[0]
        : "",

      status: editingFees.status || "pending",

      paymentMode:
        editingFees.paymentMode || "cash",
    });
  }, [editingFees]);

 
  // COMMON HANDLE CHANGE
 

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount"
          ? Number(value)
          : value,
    }));
  };

 
  // SUBMIT
 

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const payload: FeesFormData = {
      ...formData,
      paidDate: formData.paidDate || "",
    };

    console.log("FEES FORM DATA:", payload);

    onSave(payload);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">

      <h2 className="text-xl font-bold mb-5">
        {editingFees ? "Edit Fees" : "Add Fees"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >

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

        {/* AMOUNT */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={
              formData.amount === 0
                ? ""
                : formData.amount
            }
            onChange={handleChange}
            className="w-full border p-2 rounded"
            min="0"
            required
          />
        </div>

        {/* DUE DATE */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* PAID DATE */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Paid Date
          </label>

          <input
            type="date"
            name="paidDate"
            value={formData.paidDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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

        {/* PAYMENT MODE */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Payment Mode
          </label>

          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="cash">
              Cash
            </option>

            <option value="online">
              Online
            </option>
          </select>
        </div>

        {/* BUTTONS */}

        <div className="flex gap-3 col-span-2">

          <button
            type="submit"
            disabled={loadingStudents}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {editingFees
              ? "Update Fees"
              : "Save Fees"}
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

export default FeesForm;