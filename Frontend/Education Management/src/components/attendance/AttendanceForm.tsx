import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Student {
  _id: string;
  name: string;
  classId: {
    _id: string;
    name: string;
    section: string;
  };
}

interface Attendance {
  _id: string;
  studentId: {
    _id: string;
    name: string;
  };
  classId: {
    _id: string;
    name: string;
    section: string;
  };
  date: string;
  status: "present" | "absent" | "leave";

}

interface AttendanceFormProps {
  editingAttendance: Attendance | null;
  onSave: () => void;
  onClose: () => void;
}

function AttendanceForm({
  editingAttendance,
  onSave,
  onClose,
}: AttendanceFormProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<
    "present" | "absent" | "leave"
  >("present");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/student",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudents(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getStudents();
  }, []);

  useEffect(() => {
    if (editingAttendance) {
      setStudentId(editingAttendance.studentId._id);
      setDate(
        new Date(editingAttendance.date)
          .toISOString()
          .split("T")[0]
      );
      setStatus(editingAttendance.status);
    } else {
      setStudentId("");
      setDate(
        new Date().toISOString().split("T")[0]
      );
      setStatus("present");
    }
  }, [editingAttendance]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    const student = students.find(
      (item) => item._id === studentId
    );

    if (!student) {
      setError("Please select student");
      return;
    }

    try {
      setLoading(true);

      const data = {
        studentId: student._id,
        classId: student.classId._id,
        date,
        status,
      };

      if (editingAttendance) {
        await axios.patch(
          `http://localhost:5000/api/attendance/${editingAttendance._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {

        await axios.post(
          "http://localhost:5000/api/attendance",
          data,
        
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      onSave();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Attendance save failed"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          {editingAttendance
            ? "Edit Attendance"
            : "Mark Attendance"}
        </h2>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="student">
              Student
            </Label>

            <select
              id="student"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.name} -{" "}
                  {student.classId.name} (
                  {student.classId.section})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">
              Date
            </Label>

            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              Status
            </Label>

            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "present"
                    | "absent"
                    | "leave"
                )
              }
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="present">
                Present
              </option>

              <option value="absent">
                Absent
              </option>

              <option value="leave">
                Leave
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingAttendance
                ? "Update Attendance"
                : "Save Attendance"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendanceForm;