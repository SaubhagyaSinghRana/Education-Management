import { useEffect, useState } from "react";
import axios from "axios";

import AttendanceForm from "../../components/attendance/AttendanceForm";
import { Button } from "@/components/ui/button";

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
  markedBy: {
    _id: string;
    name: string;
  };
}

interface AttendanceResponse {
  success: boolean;
  data: Attendance[];
}

function TeacherAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAttendance, setEditingAttendance] =
    useState<Attendance | null>(null);

  const token = localStorage.getItem("token");

  const getAttendance = async () => {
    try {
      const res = await axios.get<AttendanceResponse>(
        "http://localhost:5000/api/attendance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAttendance(res.data.data);
    } catch (error) {
      console.error("GET ATTENDANCE ERROR:", error);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this attendance?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/attendance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getAttendance();
    } catch (error) {
      console.error("DELETE ATTENDANCE ERROR:", error);
    }
  };

  return (
    <div className="p-5">

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          Attendance
        </h1>

        <Button
          onClick={() => {
            setEditingAttendance(null);
            setShowForm(true);
          }}
        >
          Add Attendance
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Class</th>
              <th className="p-3">Section</th>
              <th className="p-3">Date</th>
              <th className="p-3">Marked By</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item) => (
              <tr
                key={item._id}
                className="border-b text-center"
              >
                <td className="p-3">
                  {item.studentId?.name}
                </td>

                <td>
                  {item.classId?.name}
                </td>

                <td>
                  {item.classId?.section}
                </td>

                <td>
                  {new Date(
                    item.date
                  ).toLocaleDateString("en-IN")}
                </td>

                <td>
                  {item.markedBy?.name}
                </td>

                <td>
                  <span
                    className={
                      item.status === "present"
                        ? "text-green-600"
                        : item.status === "absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">

                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingAttendance(item);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleDelete(item._id)
                      }
                    >
                      Delete
                    </Button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <AttendanceForm
          editingAttendance={editingAttendance}
          onSave={getAttendance}
          onClose={() => {
            setShowForm(false);
            setEditingAttendance(null);
          }}
        />
      )}

    </div>
  );
}

export default TeacherAttendance;