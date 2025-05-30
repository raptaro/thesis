"use client";

import { useEffect, useState } from "react";
import {
  Patient,
  columns,
} from "@/components/molecules/tables/patient-columns";
import { DataTable } from "@/components/ui/data-table";

export default function Page() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch patient data from the Django API or Supabase with the token
    const fetchPatients = async () => {
      try {
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
          console.error("No access token found");
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/patients/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Patient[] = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []); // Empty dependency array, meaning this runs only once on mount.

  // Filter patients based on the search term
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.middle_name || ""} ${
      patient.last_name
    }`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="mb-4 text-2xl">Medical Records</h1>
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search patient name..."
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />
      <DataTable
        columns={columns}
        data={filteredPatients} // Use the filtered patients data
      />
    </div>
  );
}
