"use client";

import React from "react";
import { useAdminPatientView } from "../hooks/useAdminPatientView";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Shield, Unlock } from "lucide-react";
import DoctorViewSkelton from "../../doctors/components/DoctorViewSkelton";
import TableComponent from "@/src/components/TableComponent";

const AdminPatientViewComponent = () => {
  const params = useParams<{ id: string }>();
  const { patient, isLoading, handleToggleBlock, column , appointments } = useAdminPatientView(
    params.id,
  );
  if (isLoading) {
    return <DoctorViewSkelton />;
  }
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/patients"
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {patient.fullName}
              </h1>
              <p className="text-slate-600 text-sm">patient ID: {patient.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* <div
              className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${
                patient.verificationStatus === "approved"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : patient.verificationStatus === "rejected"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }`}
            >
              {patient.verificationStatus === "approved" && (
                <CheckCircle className="w-4 h-4" />
              )}
              {patient.verificationStatus === "pending" && (
                <AlertCircle className="w-4 h-4" />
              )}
              {patient.verificationStatus === "approved"
                ? "Approved"
                : patient.verificationStatus === "rejected"
                  ? "Rejected"
                  : "Pending"}
            </div> */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Full Name</p>
                  <p className="font-semibold text-slate-900">
                    {patient.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Email Address</p>
                  <p className="font-semibold text-slate-900">
                    {patient.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Gender</p>
                  <p className="font-semibold text-slate-900">
                    {patient.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Phone Number</p>
                  <p className="font-semibold text-slate-900">
                    {patient.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">DOB</p>
                  <p className="font-semibold text-slate-900">{patient.dob}</p>
                </div>
                <div>
                  {/* <p className="text-sm text-slate-600 mb-1">
                    Career Start Year
                  </p>
                  <p className="font-semibold text-slate-900">
                    {patient.careerStartYear}
                  </p> */}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Appointment Details
              </h2>
              <div className=" gap-6">
                <TableComponent columns={column} data={appointments}/>
              </div>
            </div>
          </div>
          {/* Sidebar Actions */}
          <div className="space-y-4">
            {/* Block/Unblock Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Account Controls
              </h3>
              <button
                onClick={handleToggleBlock}
                // disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  !patient.isBlocked
                    ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                }`}
              >
                {!patient.isBlocked ? (
                  <>
                    <Lock className="w-4 h-4" />
                    Block patient
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    Unblock patient
                  </>
                )}
              </button>
            </div>

            {/* Status Card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPatientViewComponent;
