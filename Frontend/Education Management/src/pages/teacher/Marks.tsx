import { useEffect, useState } from "react";

import { Marks } from "../../data/marks";
import axios from "axios";

interface MarksResponse {
  success: boolean;
  data: Marks[];
}
function Marks() {
  const [marks, setMarks] = useState<Marks[]>([]);

  const getMarks = async () => {
    try {
      const res = await axios.get<MarksResponse>("http://localhost:5000/api/marks")
      setMarks(res.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getMarks();
  }, []);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Marks</h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Add Marks
        </button>

        <button
          onClick={getMarks}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700
    hover:-translate-y-1
    transition"
        >
          All Student List
        </button>
      </div>

      <table className="border w-full border-collapse bg-gray-500">
        <thead className="bg-gray-500  text-black">
          <tr className="border-b">
            <th>Exam Name</th>
            <th>Exam Type</th>
            <th>Student Name</th>
            <th>Subject Name</th>
            <th>Marks Obtained</th>
            <th>Grade</th>
            <th>Remarks</th>
            <th>Action</th>

          </tr>
        </thead>

        <tbody className="bg-gray-900 text-white ">
          {marks.map((marks) => (
            <tr key={marks._id}>
              <td>{marks.examId.title}</td>
              <td>{marks.examId.examType}</td>
              <td>{marks.studentId.name}</td>
              <td>{marks.subjectId.name}</td>
              <td>{marks.marksObtained}</td>
              <td>{marks.grade}</td>
              <td>{marks.remarks}</td>


              


              <button className=" bg-indigo-600 
    text-white 
    px-3 py-1.5 
    rounded-md
    shadow
    hover:bg-indigo-700
    hover:-translate-y-1
    transition m-1">Edit</button>
              <button className="  bg-red-600 
    text-white 
    px-3 py-1.5 
    rounded-md
    shadow
    hover:bg-red-700
    hover:-translate-y-1
    transition">Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Marks;