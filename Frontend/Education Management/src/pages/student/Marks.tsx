const marks = [
  { subject: "Math", marks: 85 },
  { subject: "Science", marks: 90 },
  { subject: "English", marks: 78 },
  { subject: "Hindi", marks: 88 },
];

function Marks() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        My Marks
      </h1>

      <table className="w-full bg-white shadow">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-3">Subject</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((item) => (
            <tr
              key={item.subject}
              className="border-b text-center"
            >
              <td className="p-3">{item.subject}</td>
              <td>{item.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Marks;