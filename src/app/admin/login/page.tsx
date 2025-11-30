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

    console.log("[CLIENT] Login form submitted");

    try {
      console.log("[CLIENT] Sending login request to /api/admin/login");
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include", // Ensure cookies are sent
      });

      console.log("[CLIENT] Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
      });

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        console.log("[CLIENT] Response not OK, parsing error data");
        const errorData = await response.json().catch(() => ({ error: "Invalid password" }));
        console.log("[CLIENT] Error data:", errorData);
        setError(errorData.error || "Invalid password");
        setLoading(false);
        return;
      }

      console.log("[CLIENT] Parsing response JSON");
      const data = await response.json();
      console.log("[CLIENT] Response data:", data);

      if (data.success) {
        console.log("[CLIENT] Login successful, checking cookies before navigation");
        console.log("[CLIENT] Document cookies:", document.cookie);
        // Use window.location for more reliable navigation in production
        // Small delay to ensure cookie is set
        console.log("[CLIENT] Setting timeout for navigation to /admin");
        setTimeout(() => {
          console.log("[CLIENT] Navigating to /admin");
          window.location.href = "/admin";
        }, 100);
      } else {
        console.log("[CLIENT] Login failed - no success flag in response");
        setError(data.error || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("[CLIENT] Login error:", err);
      setError("An error occurred. Please try again.");
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

