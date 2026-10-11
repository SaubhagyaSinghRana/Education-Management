const students = [
  { id: 1, name: "Rahul", class: "10th" },
  { id: 2, name: "Amit", class: "10th" },
  { id: 3, name: "Riya", class: "11th" },
];

function Students() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Student List
      </h1>

      <table className="w-full bg-white shadow">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th>Class</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b text-center">
              <td className="p-3">{student.name}</td>
              <td>{student.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;