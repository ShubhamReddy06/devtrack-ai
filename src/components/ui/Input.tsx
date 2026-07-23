"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, CheckCircle } from "lucide-react";

import Logo from "@/components/common/Logo";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = () => {
    let isValid = true;

    setSuccessMessage("");

    // Email Validation
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!email.includes("@")) {
      setEmailError("Enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password Validation
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    console.log("Email:", email);
    console.log("Password:", password);

    setSuccessMessage("Login Successful 🎉");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Background Effects */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-500 opacity-25 blur-[150px]"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-600 opacity-25 blur-[180px]"></div>

      <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-cyan-500 opacity-20 blur-[150px]"></div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center px-20">
          <Logo />

          <h1 className="text-5xl font-bold text-white mt-8 leading-tight">
            AI-Powered
            <br />
            Developer
            <br />
            Productivity
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-md">
            Track projects, manage tasks and boost your coding productivity
            using AI.
          </p>

          <div className="space-y-4 mt-10">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyan-400" />
              <span className="text-gray-200">AI Code Reviews</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyan-400" />
              <span className="text-gray-200">Real-time Analytics</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyan-400" />
              <span className="text-gray-200">
                Daily Productivity Streaks
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-16">
            <div>
              <h2 className="text-3xl font-bold text-cyan-400">1200+</h2>
              <p className="text-gray-400">Developers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-cyan-400">50+</h2>
              <p className="text-gray-400">Teams</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-cyan-400">98%</h2>
              <p className="text-gray-400">Productivity</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
            <div className="flex justify-center lg:hidden mb-6">
              <Logo />
            </div>

            <h1 className="text-3xl font-bold text-center text-white">
              Login to DevTrack AI
            </h1>

            <p className="text-gray-300 text-center mt-2">
              Welcome back! Please sign in to continue.
            </p>

            <div className="space-y-5 mt-8">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  icon={<Mail size={20} />}
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;

                    setEmail(value);

                    if (value === "") {
                      setEmailError("Email is required");
                    } else if (!value.includes("@")) {
                      setEmailError("Enter a valid email");
                    } else {
                      setEmailError("");
                    }
                  }}
                  error={!!emailError}
                />

                {emailError && (
                  <p className="text-red-400 text-sm mt-2">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  icon={<Lock size={20} />}
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;

                    setPassword(value);

                    if (value === "") {
                      setPasswordError("Password is required");
                    } else if (value.length < 6) {
                      setPasswordError(
                        "Password must be at least 6 characters"
                      );
                    } else {
                      setPasswordError("");
                    }
                  }}
                  error={!!passwordError}
                />

                {passwordError && (
                  <p className="text-red-400 text-sm mt-2">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-5 text-sm text-gray-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <Link
                href="#"
                className="text-cyan-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="mt-6">
              <Button onClick={handleLogin}>
                Login
              </Button>
            </div>

            {successMessage && (
              <p className="text-green-400 text-center mt-4 font-medium">
                {successMessage}
              </p>
            )}

            <button className="mt-4 w-full border border-white/20 rounded-lg py-3 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition duration-300">
              <span>🐙</span>
              Continue with GitHub
            </button>

            <p className="text-center mt-8 text-gray-300">
              Don't have an account?{" "}
              <Link
                href="#"
                className="text-cyan-400 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>

            <div className="border-t border-white/20 mt-8 pt-5 text-center text-sm text-gray-400">
              © 2026 DevTrack AI
              <br />
              Built by{" "}
              <span className="font-semibold text-white">
                Shubham Reddy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}