import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { getSession, getShows, setShows } from "@/lib/kv";

// Helper to verify session
async function verifySession(request: NextRequest): Promise<boolean> {
  const sessionToken = request.cookies.get("admin_session")?.value;
  if (!sessionToken) return false;

  try {
    return await getSession(sessionToken);
  } catch (error) {
    return false;
  }
}

// GET - Fetch all shows
export async function GET(request: NextRequest) {
  if (!(await verifySession(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const shows = await getShows();
    return NextResponse.json({ shows });
  } catch (error) {
    console.error("Error fetching shows:", error);
    return NextResponse.json(
      { error: "Failed to fetch shows" },
      { status: 500 }
    );
  }
}

// POST - Create a new show
export async function POST(request: NextRequest) {
  if (!(await verifySession(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { date, venue, city, ticketLink } = await request.json();

    if (!date || !venue || !city) {
      return NextResponse.json(
        { error: "Date, venue, and city are required" },
        { status: 400 }
      );
    }

    const newShow = {
      id: crypto.randomUUID(),
      date,
      venue,
      city,
      ticketLink: ticketLink || null,
    };

    const shows = await getShows();
    shows.push(newShow);
    await setShows(shows);
    
    return NextResponse.json({ show: newShow }, { status: 201 });
  } catch (error) {
    console.error("Error creating show:", error);
    return NextResponse.json(
      { error: "Failed to create show" },
      { status: 500 }
    );
  }
}

