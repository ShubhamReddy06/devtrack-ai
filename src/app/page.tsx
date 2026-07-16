import Navbar from "../components/layout/Navbar";
import Logo from "../components/common/Logo";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[80vh] items-center justify-center">
        <Logo />
      </main>
    </>
  );
}