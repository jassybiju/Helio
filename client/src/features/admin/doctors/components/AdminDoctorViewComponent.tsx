"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  Shield,
  Unlock,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAdminDoctorView } from "../hooks/useAdminDoctorView";
import { useParams } from "next/navigation";
import ClayButton from "@/src/components/ui/ClayButton";
import DoctorViewSkelton from "./DoctorViewSkelton";
import { DOCTOR_STATUS } from "@/src/types/user.types";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminDoctorViewComponent = () => {
  const params = useParams<{ id: string }>();
  const {
    doctor,
    appointmentStatusData,
    totalAppointments,
    isLoading,
    expandedHistory,
    setExpandedHistory,
    showDocumentModal,
    handleToggleBlock,
    handleDoctorApproval,
  } = useAdminDoctorView(params.id);

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
              href="/doctor"
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {doctor.fullName}
              </h1>
              <p className="text-slate-600 text-sm">Doctor ID: {doctor.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${
                doctor.verificationStatus === "approved"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : doctor.verificationStatus === "rejected"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }`}
            >
              {doctor.verificationStatus === "approved" && (
                <CheckCircle className="w-4 h-4" />
              )}
              {doctor.verificationStatus === "pending" && (
                <AlertCircle className="w-4 h-4" />
              )}
              {doctor.verificationStatus === "approved"
                ? "Approved"
                : doctor.verificationStatus === "rejected"
                  ? "Rejected"
                  : "Pending"}
            </div>
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
                    {doctor.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Email Address</p>
                  <p className="font-semibold text-slate-900">{doctor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Gender</p>
                  <p className="font-semibold text-slate-900">
                    {doctor.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Career Start Year
                  </p>
                  <p className="font-semibold text-slate-900">
                    {doctor.careerStartYear}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Professional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Specialization</p>
                  <p className="font-semibold text-slate-900">
                    {doctor.specialization}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Current Status</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        !doctor.isBlocked ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <p className="font-semibold text-slate-900">
                      {!doctor.isBlocked ? "Active" : "Blocked"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Appointment Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={appointmentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {appointmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              Total {totalAppointments ?? 0} appointments
            </div>

            {/* Documents Section */}
            {!!doctor.documentUrl && (
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
                    <button
                      onClick={() =>
                        showDocumentModal(doctor.documentUrl as string)
                      }
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Information */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Account Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Created At</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(doctor.createdAt).toDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Verification Status
                  </p>
                  <p className="font-semibold text-slate-900">
                    {doctor.verificationStatus === "approved"
                      ? "Verified"
                      : "Pending Verification"}
                  </p>
                </div>
              </div>
            </div>
            {/* Verification History */}
          </div>
          {/* Sidebar Actions */}
          <div className="space-y-4">
            {/* Approval Actions */}
            {doctor.verificationStatus === "pending" && (
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
                <h3 className="font-bold text-slate-900">
                  Verification Actions
                </h3>
                <p className="text-sm text-slate-600">
                  Review the doctor's credentials and approve or reject their
                  application.
                </p>
                {doctor.additionalInfo && (
                  <p className="text-slate-500">
                    Additional Info :{" "}
                    <span className="text-black">{doctor.additionalInfo}</span>
                  </p>
                )}
                <div className="space-y-3">
                  <ClayButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleDoctorApproval(DOCTOR_STATUS.APPROVED)}
                    // disabled={isLoading}
                    className="w-full "
                  >
                    ✓ Approve Doctor
                  </ClayButton>
                  <ClayButton
                    variant="danger"
                    size="sm"
                    onClick={() => handleDoctorApproval(DOCTOR_STATUS.REJECTED)}
                    // disabled={isLoading}
                    className="w-full"
                  >
                    ✗ Reject Doctor
                  </ClayButton>
                </div>
              </div>
            )}

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
                  !doctor.isBlocked
                    ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                }`}
              >
                {!doctor.isBlocked ? (
                  <>
                    <Lock className="w-4 h-4" />
                    Block Doctor
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    Unblock Doctor
                  </>
                )}
              </button>
            </div>

            {/* Status Card */}
            <div
              className={`rounded-lg border p-6 space-y-3 ${
                doctor.verificationStatus === "pending"
                  ? "bg-yellow-50 border-yellow-200"
                  : doctor.verificationStatus === "approved"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {doctor.verificationStatus === "approved" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {doctor.verificationStatus === "pending" && (
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                )}
                {doctor.verificationStatus === "rejected" && (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <h3 className="font-bold text-slate-900">
                  {doctor.verificationStatus === "approved"
                    ? "Verification Approved"
                    : doctor.verificationStatus === "pending"
                      ? "Pending Verification"
                      : "Verification Rejected"}
                </h3>
              </div>
              <p
                className={`text-sm ${
                  doctor.verificationStatus === "pending"
                    ? "text-yellow-700"
                    : doctor.verificationStatus === "approved"
                      ? "text-green-700"
                      : "text-red-700"
                }`}
              >
                {doctor.verificationStatus === "approved"
                  ? "This doctor has been verified and approved."
                  : doctor.verificationStatus === "pending"
                    ? "Waiting for admin verification."
                    : "This doctor application has been rejected."}
              </p>
            </div>
            {doctor.verificationHistory.length > 0 && (
              <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Verification History
                </h2>
                <div className="space-y-3">
                  {doctor.verificationHistory.map((history, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedHistory(
                            expandedHistory === idx ? null : idx,
                          )
                        }
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 text-left">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              history.status === "rejected"
                                ? "bg-red-100"
                                : history.status === "approved"
                                  ? "bg-green-100"
                                  : "bg-yellow-100"
                            }`}
                          >
                            {history.status === "rejected" && (
                              <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                            {history.status === "approved" && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {history.status === "pending" && (
                              <AlertCircle className="w-5 h-5 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 text-sm">
                              {history.status === "rejected"
                                ? "Rejected"
                                : history.status === "approved"
                                  ? "Approved"
                                  : "Pending"}{" "}
                              on{" "}
                              {new Date(history.actedAt).toLocaleDateString()}
                            </div>
                            {/* <div className="text-xs text-slate-500">{history.submissionId}</div> */}
                          </div>
                        </div>
                        {expandedHistory === idx ? (
                          <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        )}
                      </button>

                      {expandedHistory === idx && (
                        <div
                          className={`p-4 border-t border-slate-200 space-y-4 ${
                            history.status === "rejected"
                              ? "bg-red-50"
                              : history.status === "approved"
                                ? "bg-green-50"
                                : "bg-yellow-50"
                          }`}
                        >
                          {/* Submitted At */}
                          <div>
                            <h4 className="font-semibold text-slate-900 text-sm mb-2">
                              Submitted At
                            </h4>
                            <p className="text-sm text-slate-700">
                              {new Date(history.actedAt).toDateString()}
                            </p>
                          </div>

                          {/* Approved/Rejected At */}
                          {/* {history.actedAt && (
                            <div>
                              <h4 className="font-semibold text-slate-900 text-sm mb-2">
                                {history.status === "rejected"
                                  ? "Rejected At"
                                  : "Approved At"}
                              </h4>
                              <p className="text-sm text-slate-700">
                                {history.actedAt}
                              </p>
                            </div>
                          )} */}

                          {/* Rejection Reason */}
                          {history.reason && (
                            <div>
                              <h4
                                className={`font-semibold text-sm mb-2 ${
                                  history.status === "rejected"
                                    ? "text-red-900"
                                    : "text-slate-900"
                                }`}
                              >
                                {history.status === "rejected"
                                  ? "Rejection Reason"
                                  : "Comments"}
                              </h4>
                              <p
                                className={`text-sm ${
                                  history.status === "rejected"
                                    ? "text-red-800"
                                    : "text-slate-700"
                                }`}
                              >
                                {history.reason}
                              </p>
                            </div>
                          )}

                          {/* Approved By */}
                          {/* {history.approvedBy && ( */}

                          {/* Documents Uploaded */}
                          {history.documentUrl && (
                            <div>
                              <h4 className="font-semibold text-slate-900 text-sm mb-2">
                                Documents Uploaded
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200">
                                  <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
                                    <svg
                                      className="w-4 h-4 text-slate-600"
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
                                  <span className="text-sm font-medium text-slate-700 flex-1">
                                    Document
                                  </span>
                                  <button
                                    onClick={() =>
                                      showDocumentModal(
                                        history.documentUrl as string,
                                      )
                                    }
                                    className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorViewComponent;
