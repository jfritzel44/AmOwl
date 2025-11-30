import { NextRequest, NextResponse } from "next/server";
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

// PUT - Update a show
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { date, venue, city, ticketLink } = await request.json();
    const { id } = await params;

    if (!date || !venue || !city) {
      return NextResponse.json(
        { error: "Date, venue, and city are required" },
        { status: 400 }
      );
    }

    const shows = await getShows();
    const index = shows.findIndex((s: any) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }
    shows[index] = { id, date, venue, city, ticketLink: ticketLink || null };
    await setShows(shows);

    return NextResponse.json({ show: shows[index] });
  } catch (error) {
    console.error("Error updating show:", error);
    return NextResponse.json(
      { error: "Failed to update show" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a show
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const shows = await getShows();
    const filtered = shows.filter((s: any) => s.id !== id);
    await setShows(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting show:", error);
    return NextResponse.json(
      { error: "Failed to delete show" },
      { status: 500 }
    );
  }
}

