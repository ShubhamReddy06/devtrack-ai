"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Logo from "@/components/common/Logo";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DepthText from "@/components/ui/DepthText";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!email.includes("@")) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    // Simulate API request authentication latency
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Background radial blurs */}
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600 opacity-20 blur-[180px]" />

      {/* Background DepthText Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
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

      <div className="flex min-h-screen items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl shadow-2xl">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          <h1 className="text-center text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mb-8 mt-2 text-center text-gray-400">
            Login to access your developer productivity workspace.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              />
              {emailError && <p className="mt-1.5 text-xs text-red-400">{emailError}</p>}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
              />
              {passwordError && <p className="mt-1.5 text-xs text-red-400">{passwordError}</p>}
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot Password?
              </Link>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
