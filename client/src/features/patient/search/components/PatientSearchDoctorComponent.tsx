'use client'

import Navbar from "@/src/components/Navbar";
import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ResultsHeader from "./ResultHeader";
import DoctorPagination from "./DoctorPagination";
import DoctorCard from "./DoctorCard";

interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: number
  consultationFee: number
  services: string
  nextAvailable: string
  image: string
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Senior Cardiologist',
    rating: 4.9,
    reviews: 150,
    experience: 12,
    consultationFee: 120,
    services: 'Online & In-Clinic',
    nextAvailable: 'Today, 4:00 PM',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology Specialist',
    rating: 4.8,
    reviews: 85,
    experience: 8,
    consultationFee: 95,
    services: 'Online & In-Clinic',
    nextAvailable: 'Tomorrow, 10:00 AM',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    rating: 5.0,
    reviews: 210,
    experience: 15,
    consultationFee: 110,
    services: 'Online & In-Clinic',
    nextAvailable: 'Mon, 09:00 AM',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    rating: 4.7,
    reviews: 42,
    experience: 20,
    consultationFee: 200,
    services: 'Online & In-Clinic',
    nextAvailable: 'Mon, 09:00 AM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialty: 'Orthopedic Surgeon',
    rating: 4.6,
    reviews: 98,
    experience: 10,
    consultationFee: 150,
    services: 'In-Clinic',
    nextAvailable: 'Wed, 02:00 PM',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Dr. Robert Lee',
    specialty: 'General Practitioner',
    rating: 4.5,
    reviews: 175,
    experience: 7,
    consultationFee: 75,
    services: 'Online & In-Clinic',
    nextAvailable: 'Today, 06:00 PM',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  },
  {
    id: 7,
    name: 'Dr. Amanda Brown',
    specialty: 'Psychiatrist',
    rating: 4.9,
    reviews: 127,
    experience: 11,
    consultationFee: 130,
    services: 'Online',
    nextAvailable: 'Today, 03:00 PM',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Dr. David Martinez',
    specialty: 'Gastroenterologist',
    rating: 4.4,
    reviews: 56,
    experience: 9,
    consultationFee: 125,
    services: 'In-Clinic',
    nextAvailable: 'Tue, 11:00 AM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
]


const PatientSearchDoctorComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState({});

  const doctorsPerPage = 4;
  const totalPages = Math.ceil(mockDoctors.length / doctorsPerPage);

  const startIdx = (currentPage - 1) * doctorsPerPage;
  const displayedDoctors = mockDoctors.slice(
    startIdx,
    startIdx + doctorsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleFiltersChange = (newFilters: object) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (

        <div className="flex gap-8 w-full p-2">
          {/* Sidebar */}
          <FilterSidebar onFiltersChange={handleFiltersChange} />

          {/* Main Content */}
          <div className="flex-1 p-4">
            <ResultsHeader
              totalDoctors={120}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />

            {/* Doctor Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {displayedDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
            </div>

            {/* Pagination */}
            <DoctorPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
    
  );
};

export default PatientSearchDoctorComponent;
