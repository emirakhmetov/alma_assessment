"use client";

import React, { useEffect, useState } from "react";
import { getCountryLabel } from "../data/countryCodes";

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedin?: string;
  visaCategories: string[];
  countryOfCitizenship: string;
  message?: string;
  status: string;
  resume: { name: string; type: string; content: string } | null;
}

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) {
        throw new Error("Failed to fetch leads");
      }
      const data = await res.json();
      setLeads(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      // Update local state after successful update
      const updatedLead = await res.json();
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? updatedLead : lead))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <p>Loading leads...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">LinkedIn</th>
            <th className="px-4 py-2 border">Visa Categories</th>
            <th className="px-4 py-2 border">Country</th>
            <th className="px-4 py-2 border">Message</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">CV</th>
            <th className="px-4 py-2 border">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="px-4 py-2 border">{lead.id}</td>
              <td className="px-4 py-2 border">
                {lead.firstName} {lead.lastName}
              </td>
              <td className="px-4 py-2 border">{lead.email}</td>
              <td className="px-4 py-2 border">{lead.linkedin || "-"}</td>
              <td className="px-4 py-2 border">
                {lead.visaCategories.join(", ")}
              </td>
              <td className="px-4 py-2 border">
                {getCountryLabel(lead.countryOfCitizenship)}
              </td>
              <td className="px-4 py-2 border">{lead.message || "-"}</td>
              <td className="px-4 py-2 border">{lead.status}</td>
              <td className="px-4 py-2 border">
                {lead.resume ? (
                  <a
                    href={`data:${lead.resume.type};base64,${lead.resume.content}`}
                    download={lead.resume.name}
                    className="text-blue-500 underline"
                  >
                    Download CV
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2 border">
                <select
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
