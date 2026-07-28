interface StatsCardProps {
  title: string;
  value: number;
}

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-sm font-medium text-gray-500">
        {title}
      </h3>

      <p className="mt-4 text-4xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}