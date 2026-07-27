import AuthLayout from "@/components/layout/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join DevTrack AI and start your journey."
    >
      <form className="space-y-4">
        <Input
          type="text"
          placeholder="Full Name"
        />

        <Input
          type="email"
          placeholder="Email Address"
        />

        <Input
          type="password"
          placeholder="Password"
        />

        <Input
          type="password"
          placeholder="Confirm Password"
        />

        <Button className="w-full">
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}