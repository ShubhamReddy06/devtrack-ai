"use client";

import { useState } from "react";
import Link from "next/link";

import Logo from "@/components/common/Logo";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleResetPassword() {
    setEmailError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }

    console.log({
      email,
    });

    setSuccessMessage("Password reset link sent successfully! 🎉");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Background Blur */}
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600 opacity-20 blur-[180px]" />

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">

          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          {/* Heading */}
          <h1 className="text-center text-3xl font-bold text-white">
            📧 Forgot Password
          </h1>

          <p className="mt-2 mb-8 text-center text-gray-400">
            Enter your email address and we will send you a password reset link.
          </p>

          {/* Email */}
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setSuccessMessage("");
            }}
          />

          {emailError && (
            <p className="mt-2 text-sm text-red-500">
              {emailError}
            </p>
          )}

          {/* Button */}
          <div className="mt-6">
            <Button
              onClick={handleResetPassword}
              disabled={!email.trim()}
            >
              Send Reset Link
            </Button>
          </div>

          {/* Success */}
          {successMessage && (
            <p className="mt-4 text-center font-medium text-green-500">
              {successMessage}
            </p>
          )}

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-400">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}