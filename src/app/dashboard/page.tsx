"use client";

import Button from "@/components/ui/Button";
import StatsCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleRefresh = () => {
    console.log("Refreshing dashboard...");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, Shubham 👋
          </h1>

          <p className="mt-2 text-gray-400">{today}</p>

          <p className="mt-2 text-gray-300">
            Here's a quick overview of your disputes.
          </p>
        </div>

        <div className="w-40">
          <Button onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="📂 Total Disputes" value={48} />
        <StatsCard title="📬 Open Cases" value={12} />
        <StatsCard title="✅ Resolved Cases" value={31} />
        <StatsCard title="⏳ Pending Evidence" value={5} />
      </div>
    </div>
  );
}