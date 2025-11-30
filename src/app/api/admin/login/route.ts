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
  console.log("[SERVER] Login request received");
  try {
    const requestBody = await request.json();
    const { password } = requestBody;
    console.log("[SERVER] Password received:", password ? "***" : "missing");

    if (!password) {
      console.log("[SERVER] No password provided, returning 400");
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // If no hash is set, we need to initialize it
    // For first-time setup, you can set a password and it will be hashed
    if (!ADMIN_PASSWORD_HASH) {
      console.log("[SERVER] ADMIN_PASSWORD_HASH not configured");
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
    console.log("[SERVER] Verifying password");
    const hashedInput = hashPassword(password);
    const passwordMatch = hashedInput === ADMIN_PASSWORD_HASH;
    console.log("[SERVER] Password match:", passwordMatch);

    if (!passwordMatch) {
      console.log("[SERVER] Invalid password, returning 401");
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate session token
    console.log("[SERVER] Generating session token");
    const sessionToken = generateSessionToken();
    console.log("[SERVER] Session token generated:", sessionToken.substring(0, 8) + "...");

    // Store session in KV
    console.log("[SERVER] Storing session in KV");
    const { setSession } = await import("@/lib/kv");
    const kvResult = await setSession(sessionToken, 14400); // 4 hours
    console.log("[SERVER] KV storage result:", kvResult);

    // For now, we'll use a cookie-based approach with a signed cookie
    // In production, use Vercel KV for session storage
    console.log("[SERVER] Setting cookie");
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
    console.log("[SERVER] Environment:", {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      isProduction,
    });
    
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: isProduction, // Use secure cookies in production
      sameSite: "lax",
      maxAge: 14400, // 4 hours
      path: "/",
    });
    console.log("[SERVER] Cookie set with options:", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 14400,
      path: "/",
    });

    console.log("[SERVER] Returning success response");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SERVER] Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

