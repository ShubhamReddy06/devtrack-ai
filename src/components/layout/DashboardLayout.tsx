import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <Navbar />

      <div className="flex">
        
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </>
  );
}