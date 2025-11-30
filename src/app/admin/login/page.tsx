"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0a] text-[#ededed] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-[#d4d4d4]">A.M.</span>{" "}
            <span className="text-[#c53030]">OWL</span>
          </h1>
          <p className="text-[#9ca3af]">Admin Login</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a15] rounded-lg p-8 border border-[#2a2a1a]"
        >
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#d4d4d4] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f0a] border border-[#2a2a1a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#c53030] transition-colors"
              placeholder="Enter admin password"
              required
            />
          </div>
          {error && (
            <div className="mb-4 p-3 bg-[#c53030]/20 border border-[#c53030] rounded-lg text-[#c53030] text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-[#c53030] text-white rounded-full font-semibold hover:bg-[#a02626] transition-colors uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

