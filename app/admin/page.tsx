// app/admin/page.tsx
"use client";

import React from "react";
import LeadTable from "../components/LeadTable";
import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // adjust path as needed

export default function AdminPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <p>
          You are not authenticated. Please{" "}
          <Link href="/login" className="text-blue-500 underline">
            login
          </Link>{" "}
          to access the admin panel.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Leads</h1>
      <LeadTable />
    </main>
  );
}
