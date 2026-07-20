import DashboardLayout from "../components/layout/DashboardLayout";
import Logo from "../components/common/Logo";
import Button from "../components/ui/Button";


export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <Logo />

        <p className="mt-4 text-lg text-gray-600">
          Welcome back, Shubham 👋
        </p>

        <button
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Project
        </button>
      </div>
    </DashboardLayout>
  );
}