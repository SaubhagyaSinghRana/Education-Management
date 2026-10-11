function Dashboard() {
  const cards = [
    { title: "My Students", value: 120 },
    { title: "My Classes", value: 5 },
    { title: "Attendance", value: "95%" },
    { title: "Subjects", value: 4 },
  ];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Teacher Dashboard
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

            <p className="mt-3 text-2xl font-bold text-green-600">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;