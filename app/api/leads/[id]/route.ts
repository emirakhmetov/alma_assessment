import { NextResponse } from "next/server";
import { leads } from "../../../data/leads";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const leadId = Number(params.id);
    const body = await req.json();
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }
    if (body.status) {
      lead.status = body.status;
    }
    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ message: "Error updating lead" }, { status: 500 });
  }
}
