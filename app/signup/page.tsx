"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role is "user"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to sign up");
      }

      // Successful signup: display feedback and redirect to login
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 bg-gray-50/50">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 text-center font-serif">Create an Account</h2>
        <p className="mt-1 text-sm text-gray-600 text-center">
          Join Wanderlust and start your journey
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              required
              disabled={loading || !!success}
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-[#00A9B5] focus:outline-none focus:ring-1 focus:ring-[#00A9B5] transition-all disabled:bg-gray-50"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              required
              disabled={loading || !!success}
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-[#00A9B5] focus:outline-none focus:ring-1 focus:ring-[#00A9B5] transition-all disabled:bg-gray-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              disabled={loading || !!success}
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-[#00A9B5] focus:outline-none focus:ring-1 focus:ring-[#00A9B5] transition-all disabled:bg-gray-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!success}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00A9B5] hover:bg-[#008f9a] py-2.5 text-sm font-semibold text-white transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#00A9B5] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
