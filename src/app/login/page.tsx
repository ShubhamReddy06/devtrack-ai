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

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleSignup() {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage("");

    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    }

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
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    console.log({ name, email, password });
    setSuccessMessage("Account Created Successfully 🎉");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600 opacity-20 blur-[180px]" />

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>

          <h1 className="text-center text-3xl font-bold text-white">Create Your Account</h1>
          <p className="mb-8 mt-2 text-center text-gray-400">
            Join DevTrack AI and start managing your projects.
          </p>

          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(""); }}
              />
              {nameError && <p className="mt-1 text-sm text-red-500">{nameError}</p>}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              />
              {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-sm text-cyan-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
              {password && (
                <p className={`mt-1 text-sm ${password.length < 8 ? "text-red-500" : "text-green-500"}`}>
                  {password.length < 8 ? "Weak Password" : "Strong Password"}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError("");
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-sm text-cyan-400"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>
              )}
            </div>
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
            <Button onClick={handleSignup} disabled={!agree}>
              Create Account
            </Button>
          </div>

          {successMessage && (
            <p className="mt-4 text-center font-semibold text-green-500">
              {successMessage}
            </p>
          )}

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-cyan-400 hover:text-cyan-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
