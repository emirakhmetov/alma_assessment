

import { NextResponse } from "next/server";

let leads: Array<Record<string, any>> = [];

export async function POST(req: Request) {

    console.log("Incoming Content-Type:", req.headers.get("content-type"));
  try {
    const form = await req.formData();
    const data = Object.fromEntries(form.entries()) as Record<string, any>;

    data.visaCategories = form.getAll("visaCategories").map((v) => v.toString());

    const resumeFile = form.get("resume") as File | null;
    let resumeData = null;
    if (resumeFile && resumeFile.size > 0) {
      // Convert the file into a base64 string
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const base64 = buffer.toString("base64");
      resumeData = { name: resumeFile.name, type: resumeFile.type, content: base64 };
    }

    const newLead = {
      id: Date.now(),
      ...data,
      status: "Pending", 
      resume: resumeData,
    };

    leads.push(newLead);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json({ message: "Error processing form data" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(leads);
}