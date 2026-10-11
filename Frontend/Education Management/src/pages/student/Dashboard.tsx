function Dashboard() {
  const cards = [
    { title: "Attendance", value: "95%" },
    { title: "Average Marks", value: "82%" },
    { title: "Subjects", value: 6 },
    { title: "Pending Fees", value: "₹ 0" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-lg bg-white p-5 shadow"
          >
            <h2 className="text-lg font-semibold">
              {card.title}
            </h2>

            <p className="mt-3 text-2xl font-bold text-indigo-600">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;