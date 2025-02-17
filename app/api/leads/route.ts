import { NextResponse } from "next/server";

const leads: Array<Record<string, any>> = [];

export async function GET() {
  return NextResponse.json(leads);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newLead = {
      id: Date.now(),
      ...body,
      status: "Pending",
    };

    leads.push(newLead);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}
