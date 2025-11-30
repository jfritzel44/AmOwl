import { NextResponse } from "next/server";
import { getShows } from "@/lib/kv";

// Public API to fetch shows (no authentication required)
export async function GET() {
  try {
    const shows = await getShows();
    // Sort by date
    shows.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return NextResponse.json({ shows });
  } catch (error) {
    console.error("Error fetching shows:", error);
    return NextResponse.json({ shows: [] });
  }
}

