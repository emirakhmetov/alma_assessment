"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import LeadTable from "../components/LeadTable";
import Link from "next/link";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Admin Leads</h1>
        <button onClick={() => signOut()} className="bg-red-500 text-white py-1 px-2 rounded">
          Logout
        </button>
      </div>
      <LeadTable />
    </main>
  );
}
