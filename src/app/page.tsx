import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Logo from "../components/common/Logo";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center">
          <Logo />
        </main>
      </div>
    </>
  );
}