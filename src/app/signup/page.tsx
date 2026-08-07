"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

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
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!agree) {
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    // Simulate signup latency
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }, 800);
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join DevTrack AI and start your journey."
    >
      {success ? (
        <div className="text-center py-6 space-y-3">
          <div className="text-4xl">🎉</div>
          <h3 className="text-xl font-bold text-green-400">Account Created!</h3>
          <p className="text-sm text-gray-400">Redirecting to login page...</p>
        </div>
      ) : (
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => { setName(e.target.value); setNameError(""); }}
            />
            {nameError && <p className="mt-1 text-xs text-red-400">{nameError}</p>}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
            />
            {emailError && <p className="mt-1 text-xs text-red-400">{emailError}</p>}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
            />
            {passwordError && <p className="mt-1 text-xs text-red-400">{passwordError}</p>}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(""); }}
            />
            {confirmPasswordError && <p className="mt-1 text-xs text-red-400">{confirmPasswordError}</p>}
          </div>

          <div className="flex items-center gap-2.5 py-1">
            <input
              type="checkbox"
              id="agree-checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="agree-checkbox" className="text-xs text-gray-400 select-none cursor-pointer">
              I agree to the Terms & Conditions
            </label>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={isLoading || !agree}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}