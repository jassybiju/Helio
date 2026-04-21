"use client";

import React from "react";
import { useAdminPatientView } from "../hooks/useAdminPatientView";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Shield, Unlock } from "lucide-react";
import DoctorViewSkelton from "../../doctors/components/DoctorViewSkelton";

const AdminPatientViewComponent = () => {
  const params = useParams<{ id: string }>();
  const { patient, isLoading, handleToggleBlock } = useAdminPatientView(
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

            {/* Professional Information */}

            {/* Documents Section */}
            {/* {!!patient.documentUrl && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Uploaded Documents
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 16.5a1 1 0 11-2 0 1 1 0 012 0zM15 7a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-900">
                      document
                    </span>
                  </div>
                  <button onClick={()=>showDocumentModal(patient.documentUrl as string)} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View
                  </button>
                </div>
              </div>
            </div>
                      )} */}

            {/* Account Information */}
            {/* <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Account Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Created At</p>
                  <p className="font-semibold text-slate-900">
                    {patient.createdAt}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Verification Status
                  </p>
                  <p className="font-semibold text-slate-900">
                    {patient.verificationStatus === "approved"
                      ? "Verified"
                      : "Pending Verification"}
                  </p>
                </div>
              </div>
            </div> */}
            {/* Verification History */}
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
