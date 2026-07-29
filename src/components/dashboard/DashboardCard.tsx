interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
}

export default function DashboardCard({
  title,
  value,
  description,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-sm font-semibold text-gray-500">
        {title}
      </h3>

      <h2 className="mt-3 text-4xl font-bold text-gray-800">
        {value}
      </h2>

      <p className="mt-2 text-sm text-green-600">
        {description}
      </p>
    </div>
  );
}