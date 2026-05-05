"use client";

import Link from "next/link";


interface DoctorCardProps {
  doctorId : string
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  experienceYears: number;
  fees : {
    online : number,
    clinic : number
  },
  nextAvailableSlot: string;
  image: string;
}

export default function DoctorCard({
  doctorId,
  name,
  specialization,
  experienceYears,
  nextAvailableSlot,
  fees
}: DoctorCardProps) {
  console.log(fees)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-blue-600 font-medium text-sm">
              {specialization}
            </p>
            {/* <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold text-gray-900">{rating}</span>
              <span className="text-gray-600 text-sm">• {reviews} Reviews</span>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-300 uppercase text-xs font-semibold tracking-wide">
              Experience
            </p>
            <p className="font-semibold text-gray-900 text-base">
              {experienceYears} Years
            </p>
          </div>
          <div>
            <p className="text-gray-600 uppercase text-xs font-semibold tracking-wide">
              Consultation
            </p>
            <p className="font-semibold text-gray-900 text-base">
              ${fees?.online}
            </p>
          </div>
          {/* <div>
            <p className="text-gray-600 uppercase text-xs font-semibold tracking-wide">Services</p>
            <p className="font-semibold text-gray-900">{services}</p>
          </div> */}
          <div>
            <p className="text-gray-600 uppercase text-xs font-semibold tracking-wide">
              Next Available
            </p>
            <p className="font-semibold text-green-600">{new Date(nextAvailableSlot).toString()}</p>
          </div>
        </div>

        <Link href={`/doctor/${doctorId}/booking`} className="px-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
