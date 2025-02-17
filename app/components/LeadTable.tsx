"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { getCountryLabel } from "../data/countryCodes";

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  countryOfCitizenship: string;
  resume: { name: string; type: string; content: string } | null;
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchLeads() {
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setLeads(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  async function handleStatusChange(id: number, newStatus: string) {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updatedLead = await res.json();
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? updatedLead : lead))
      );
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading leads...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <aside className="w-64 bg-black text-white">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">alma</div>
        <nav className="p-6">
          <ul className="space-y-4">
            <li className="font-medium hover:text-gray-300 cursor-pointer">Leads</li>
            <li className="font-medium hover:text-gray-300 cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Leads</h1>
          <div className="flex gap-4">
            <Link href="/">
              <button className="bg-black text-white py-2 px-4 rounded font-bold text-sm hover:bg-gray-800">
                Go back to Homepage
              </button>
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm font-bold"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-gray-500 uppercase text-xs font-medium">Name</th>
                <th className="px-4 py-3 text-gray-500 uppercase text-xs font-medium">Submitted</th>
                <th className="px-4 py-3 text-gray-500 uppercase text-xs font-medium">Status</th>
                <th className="px-4 py-3 text-gray-500 uppercase text-xs font-medium">Country</th>
                <th className="px-4 py-3 text-gray-500 uppercase text-xs font-medium">CV</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {lead.firstName} {lead.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(lead.id).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {lead.status === "Pending" ? (
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reached Out">Reached Out</option>
                      </select>
                    ) : (
                      <span className="font-semibold text-sm text-green-600">Reached Out</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {getCountryLabel(lead.countryOfCitizenship)}
                  </td>
                  <td className="px-4 py-3">
                    {lead.resume ? (
                      <a
                        href={`data:${lead.resume.type};base64,${lead.resume.content}`}
                        download={lead.resume.name}
                        className="text-blue-500 underline text-sm"
                      >
                        Download
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
