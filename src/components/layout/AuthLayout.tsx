import { ReactNode } from "react";
import Logo from "../common/Logo";
import DepthText from "../ui/DepthText";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-950 px-4 overflow-hidden">
      {/* Background DepthText Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none z-0">
        <DepthText
          text="DevTrack"
          layers={45}
          depth={3.5}
          faceColor="#3b82f6"
          depthColor="#1d4ed8"
          fontSize="clamp(6rem, 25vw, 16rem)"
          fontWeight={950}
          tilt={12}
          pointerTracking={true}
          autoOrbit={true}
          orbitSpeed={0.08}
          shadow={false}
        />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-xl transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-white">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mt-2 mb-6 text-center text-gray-400">
          {subtitle}
        </p>

        {/* Page Content */}
        {children}

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DevTrack AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}