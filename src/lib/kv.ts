import { kv } from "@vercel/kv";

// In-memory fallback for local development
const memoryStore: {
  sessions: Map<string, { value: string; expires: number }>;
  shows: any[];
} = {
  sessions: new Map(),
  shows: [],
};

// Check if KV is available
function isKVAvailable(): boolean {
  return !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  );
}

export async function getKVClient() {
  if (isKVAvailable()) {
    return kv;
  }
  // Return a mock client for local development
  return null;
}

// Helper functions for shows
export async function getShows() {
  try {
    if (isKVAvailable()) {
      const client = await getKVClient();
      if (client) {
        const shows = await client.get("shows");
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
        await client.set("shows", shows);
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
      const client = await getKVClient();
      if (client) {
        const session = await client.get(`session:${token}`);
        return session === "valid";
      }
    }
    // Fallback to in-memory store for local development
    const session = memoryStore.sessions.get(token);
    if (session && session.expires > Date.now()) {
      return true;
    }
    // Clean up expired sessions
    if (session && session.expires <= Date.now()) {
      memoryStore.sessions.delete(token);
    }
    return false;
  } catch (error) {
    console.error("Error getting session from KV:", error);
    // Fallback to in-memory check
    const session = memoryStore.sessions.get(token);
    return session ? session.expires > Date.now() : false;
  }
}

export async function setSession(token: string, ttl: number = 14400) {
  try {
    if (isKVAvailable()) {
      const client = await getKVClient();
      if (client) {
        await client.set(`session:${token}`, "valid", { ex: ttl }); // 4 hours default
        return true;
      }
    }
    // Fallback to in-memory store for local development
    const expires = Date.now() + ttl * 1000;
    memoryStore.sessions.set(token, { value: "valid", expires });
    return true;
  } catch (error) {
    console.error("Error setting session in KV:", error);
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
        await client.del(`session:${token}`);
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

