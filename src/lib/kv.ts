import { createClient } from "@vercel/kv";

// Key prefix to avoid conflicts when sharing KV database across multiple projects
// Set KV_KEY_PREFIX environment variable (e.g., "amowl", "band2", etc.)
// If not set, defaults to "amowl" for this project
const KEY_PREFIX = process.env.KV_KEY_PREFIX || "amowl";

// In-memory fallback for local development
const memoryStore: {
  sessions: Map<string, { value: string; expires: number }>;
  shows: any[];
} = {
  sessions: new Map(),
  shows: [],
};

// Check if KV is available
export function isKVAvailable(): boolean {
  const hasKV = !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  );
  console.log("[KV] KV availability check:", {
    hasKV,
    hasURL: !!process.env.KV_REST_API_URL,
    hasToken: !!process.env.KV_REST_API_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
  });
  return hasKV;
}

// Create KV client if available
let kvClient: ReturnType<typeof createClient> | null = null;

export async function getKVClient() {
  if (isKVAvailable()) {
    if (!kvClient) {
      kvClient = createClient({
        url: process.env.KV_REST_API_URL!,
        token: process.env.KV_REST_API_TOKEN!,
      });
    }
    return kvClient;
  }
  // Return null for local development
  return null;
}

// Helper functions for shows
export async function getShows() {
  try {
    if (isKVAvailable()) {
      const client = await getKVClient();
      if (client) {
        const shows = await client.get(`${KEY_PREFIX}:shows`);
        return (shows as any[]) || [];
      }
    }
    // Fallback to in-memory store for local development
    return memoryStore.shows;
  } catch (error) {
    console.error("Error getting shows from KV:", error);
    return memoryStore.shows;
  }
}

export async function setShows(shows: any[]) {
  try {
    if (isKVAvailable()) {
      const client = await getKVClient();
      if (client) {
        await client.set(`${KEY_PREFIX}:shows`, shows);
        return true;
      }
    }
    // Fallback to in-memory store for local development
    memoryStore.shows = shows;
    return true;
  } catch (error) {
    console.error("Error setting shows in KV:", error);
    memoryStore.shows = shows;
    return true;
  }
}

// Helper functions for sessions
export async function getSession(token: string) {
  try {
    if (isKVAvailable()) {
      console.log("[KV] Using Vercel KV to get session");
      const client = await getKVClient();
      if (client) {
        const session = await client.get(`${KEY_PREFIX}:session:${token}`);
        const isValid = session === "valid";
        console.log("[KV] Session from KV:", isValid);
        return isValid;
      }
    }
    // Fallback to in-memory store for local development
    console.warn("[KV] WARNING: KV not available, checking in-memory store. This will NOT work in production!");
    const session = memoryStore.sessions.get(token);
    if (session && session.expires > Date.now()) {
      console.log("[KV] Session found in memory (local dev only)");
      return true;
    }
    // Clean up expired sessions
    if (session && session.expires <= Date.now()) {
      memoryStore.sessions.delete(token);
    }
    console.log("[KV] Session not found in memory");
    return false;
  } catch (error) {
    console.error("[KV] Error getting session from KV:", error);
    // Fallback to in-memory check
    const session = memoryStore.sessions.get(token);
    return session ? session.expires > Date.now() : false;
  }
}

export async function setSession(token: string, ttl: number = 14400) {
  try {
    if (isKVAvailable()) {
      console.log("[KV] Using Vercel KV to store session");
      const client = await getKVClient();
      if (client) {
        await client.set(`${KEY_PREFIX}:session:${token}`, "valid", { ex: ttl }); // 4 hours default
        console.log("[KV] Session stored in KV successfully");
        return true;
      }
    }
    // Fallback to in-memory store for local development
    console.warn("[KV] WARNING: KV not available, using in-memory store. This will NOT work in production!");
    const expires = Date.now() + ttl * 1000;
    memoryStore.sessions.set(token, { value: "valid", expires });
    console.log("[KV] Session stored in memory (local dev only)");
    return true;
  } catch (error) {
    console.error("[KV] Error setting session in KV:", error);
    // Fallback to in-memory store
    const expires = Date.now() + ttl * 1000;
    memoryStore.sessions.set(token, { value: "valid", expires });
    return true;
  }
}

export async function deleteSession(token: string) {
  try {
    if (isKVAvailable()) {
      const client = await getKVClient();
      if (client) {
        await client.del(`${KEY_PREFIX}:session:${token}`);
        return true;
      }
    }
    // Fallback to in-memory store for local development
    memoryStore.sessions.delete(token);
    return true;
  } catch (error) {
    console.error("Error deleting session from KV:", error);
    memoryStore.sessions.delete(token);
    return true;
  }
}

