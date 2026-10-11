import axios from "axios";
import { useEffect, useState } from "react";

interface Attendance {
  _id: string;
  date: string;
  status: "present" | "absent" | "leave";
}

function StudentAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/attendance/my-attendance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAttendance(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAttendance();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Attendance
      </h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item) => (
              <tr key={item._id} className="border-b text-center">
                <td className="p-3">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td className="p-3 capitalize">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentAttendance;