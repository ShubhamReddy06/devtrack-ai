import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
          Settings
        </h1>
      </div>
    </DashboardLayout>
  );
}