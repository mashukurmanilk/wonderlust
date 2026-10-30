"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "../lib/auth-client";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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
    setLoading(true);

    try {
      // 1. Attempt sign in via Better-Auth client
      if (signIn && typeof (signIn as any).email === "function") {
        const res = await (signIn as any).email({
          email: formData.email,
          password: formData.password,
        });

        if (res?.error) {
          throw new Error(res.error.message || "Invalid email or password");
        }

        router.push("/profile");
        router.refresh();
        return;
      }
      throw new Error("Direct client login unavailable, using API fallback");
    } catch (err: any) {
      // 2. Fallback to express /login endpoint
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const fallbackRes = await fetch(`${backendUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        const fallbackData = await fallbackRes.json();
        if (!fallbackRes.ok) {
          throw new Error(fallbackData.error || err.message || "Failed to log in");
        }

        router.push("/profile");
        router.refresh();
      } catch (fallbackErr: any) {
        setError(fallbackErr.message || "Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 bg-gray-50/50">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 text-center font-serif">Welcome Back</h2>
        <p className="mt-1 text-sm text-gray-600 text-center">
          Log in to your Wanderlust account
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-[#00A9B5] focus:outline-none focus:ring-1 focus:ring-[#00A9B5] transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-[#00A9B5] focus:outline-none focus:ring-1 focus:ring-[#00A9B5] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#00A9B5] hover:bg-[#008f9a] py-2.5 text-sm font-semibold text-white transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-[#00A9B5] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
