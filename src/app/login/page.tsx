"use client";

import { useState } from "react";
import Link from "next/link";

import Logo from "@/components/common/Logo";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  function handleSignup() {
    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">

      {/* Background */}
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600 opacity-20 blur-[180px]" />

      <div className="flex min-h-screen items-center justify-center px-4">

        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">

          <div className="mb-8 flex justify-center">
            <Logo />
          </div>

          <h1 className="text-center text-3xl font-bold text-white">
            Create Your Account
          </h1>

          <p className="mb-8 mt-2 text-center text-gray-400">
            Join DevTrack AI and start managing your projects.
          </p>

          <div className="space-y-4">

            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

          </div>

          <div className="mt-5 flex items-center gap-2">

            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />

            <label className="text-sm text-gray-300">
              I agree to the Terms & Conditions
            </label>

          </div>

          <div className="mt-6">
            <Button
              onClick={handleSignup}
              disabled={!agree}
            >
              Create Account
            </Button>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}