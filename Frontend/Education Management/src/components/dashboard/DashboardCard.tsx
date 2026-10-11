interface DashboardCardProps {
  title: string;
  value: string;
}

function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <p className="text-slate-500">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold">
        {value}
      </h2>

    </div>
  );
}

export default DashboardCard;