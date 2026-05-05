"use client";

import React, { useMemo, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ResultsHeader from "./ResultHeader";
import DoctorPagination from "./DoctorPagination";
import DoctorCard from "./DoctorCard";
import { usePatientSearchDoctor } from "../hooks/usePatientSearchDoctor";

// ---------------- TYPES ----------------
export type SearchDoctorsQueryParams = {
  name?: string;
  specialization?: string;
  location?: string;
  consultationType?: "ONLINE" | "CLINIC";
  minFee?: number;
  maxFee?: number;
  experienceYears?: number;
  date?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
};

const PatientSearchDoctorComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState<SearchDoctorsQueryParams>({});

  const queryParams = useMemo(() => {
    return {
      page: currentPage,
      limit: 4,
      sortBy,
      ...filters,
    };
  }, [currentPage, sortBy, filters]);

  const { data, isLoading, error } = usePatientSearchDoctor(queryParams);
  const doctors = data?.data?.data;
  console.log(data, doctors);
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error</div>;

  return (
    <div className="flex gap-8 p-4 w-full">
      <FilterSidebar
        onFiltersChange={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1); // ✅ reset pagination
        }}
      />
      <div className="flex-1">
        <ResultsHeader
          totalDoctors={data?.data?.total ?? 0}
          sortBy={sortBy}
          onSortChange={(val) => {
            setSortBy(val);
            setCurrentPage(1);
          }}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {doctors?.length ? (
            doctors.map((doc) => <DoctorCard key={doc.doctorId} {...doc} />)
          ) : (
            <p>No doctors found</p>
          )}
        </div>

        <DoctorPagination
          currentPage={currentPage}
          totalPages={data?.data?.totalPages ?? 1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PatientSearchDoctorComponent;
