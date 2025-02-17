"use client";

import React, { useEffect, useState } from "react";

import {getCountryLabel} from '../data/countryCodes'
interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  linkedin?: string;
  visaCategories: string[];
  country: string;
  message?: string;
  status: string;
  resume: { name: string; type: string; content: string } | null;
}

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
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
    }
    fetchLeads();
  }, []);

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
              <td className="px-4 py-2 border">{lead.visaCategories.join(", ")}</td>
              <td className="px-4 py-2 border">{getCountryLabel(lead.country)}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
