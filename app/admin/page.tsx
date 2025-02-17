"use client";

import React from "react";
import LeadTable from "../components/LeadTable";

export default function AdminPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Leads</h1>
      <LeadTable />
    </main>
  );
}
