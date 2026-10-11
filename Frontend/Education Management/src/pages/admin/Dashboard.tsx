function Dashboard() {
  const cards = [
    { title: "Students", value: 250 },
    { title: "Teachers", value: 20 },
    { title: "Classes", value: 12 },
    { title: "Subjects", value: 18 },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
      </h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((item) => (
          <div
            key={item.title}
            className="rounded-lg bg-white p-5 shadow"
          >
            <h2 className="text-md font-semibold">
              {item.title}
            </h2>

            <p className="mt-3 text-2xl font-bold text-blue-600">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;