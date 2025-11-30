import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

// In production, store this in environment variable or KV
// Default password hash for "yeahbaby2025"
// You can override this with ADMIN_PASSWORD_HASH environment variable
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "b461e7a398a69321e2f6a0626c976d1d0ae36f238e06b00a285cbbae2a95679e";

// Helper to hash password
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Helper to generate session token
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // If no hash is set, we need to initialize it
    // For first-time setup, you can set a password and it will be hashed
    if (!ADMIN_PASSWORD_HASH) {
      // This is a one-time setup - hash the provided password
      // In production, you'd set this in your environment variables
      const hashedPassword = hashPassword(password);
      return NextResponse.json(
        {
          error:
            "Admin password not configured. Please set ADMIN_PASSWORD_HASH in your environment variables.",
          setupHash: hashedPassword, // For initial setup only
        },
        { status: 500 }
      );
    }

    // Verify password
    const hashedInput = hashPassword(password);
    if (hashedInput !== ADMIN_PASSWORD_HASH) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate session token
    const sessionToken = generateSessionToken();

    // Store session in KV
    const { setSession } = await import("@/lib/kv");
    await setSession(sessionToken, 14400); // 4 hours

    // For now, we'll use a cookie-based approach with a signed cookie
    // In production, use Vercel KV for session storage
    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 14400, // 4 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

