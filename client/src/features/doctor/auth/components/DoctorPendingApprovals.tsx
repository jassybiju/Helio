"use client";

import React, { useState } from "react";
import { useDoctorPendingApproval } from "../hooks/useDoctorPendingApproval";
import ClayButton from "@/src/components/ui/ClayButton";
import { ChevronDown, ChevronUp, Timer } from "lucide-react";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

const DoctorPendingApprovals = () => {
  const { user } = useAuth();
  const {
    rejection_reason,
    verification_history,
    verification_status,
    document_url,
  } = useDoctorPendingApproval();
  const [expanded, setExpanded] = useState<number | null>(null);

  const statusConfig = {

    pending: {
      icon: <Timer className="text-yellow-500" />,
      label: "Pending Approval",
      color: "bg-yellow-100 text-yellow-800",
      bgColor: "bg-yellow-50",
    },
    approved: {
      icon: <Timer className="text-yellow-500" />,
      label: "Approved",
      color: "bg-green-100 text-green-800",
      bgColor: "bg-green-50",
    },
    rejected: {
      icon: <Timer className="text-yellow-500" />,
      label: "Rejected",
      color: "bg-red-100 text-red-800",
      bgColor: "bg-red-50",
    },
  };
  const expandedRejection = true;
  const currentStatus =
    statusConfig[verification_status as keyof typeof statusConfig] ||
    statusConfig.pending;
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Thank You for <span className="text-blue-600">Registering</span>
              </h1>
              <p className="text-slate-600 text-lg">
                Your credentials have been submitted for verification. Our
                medical board team will review them shortly to ensure the
                highest standards of care
              </p>
            </div>

            {/* Profile Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
              {/* Shield Icon */}
              <div className="flex justify-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${currentStatus.bgColor}`}
                >
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center text-slate-900">
                Your Profile Is Under Review
              </h2>

              {/* Info Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">Doctor Name</span>
                  <span className="font-semibold text-slate-900">
                    {user?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-600">Registered Email</span>
                  <span className="font-semibold text-slate-900">
                    {user?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 ">
                  <span className="text-slate-600">Submitted Date</span>
                  <span className="font-semibold text-slate-900">
                    {verification_history?.[0]?.actedAt}
                  </span>
                </div>
              </div>

              {/* Documents Uploaded */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Documents Uploaded
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-blue-600"
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
                    <span className="text-sm font-medium text-slate-900 flex-1">
                      Dcoument
                    </span>
                    <button
                      // onClick={() => setViewingDocument(doc)}
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center pt-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${currentStatus.color}`}
                >
                  ● {currentStatus.label}
                </span>
              </div>
            </div>

            {/* Previous Responses Section */}
            {verification_history.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">
                  Previous Submissions
                </h3>
                <div className="space-y-3">
                  {verification_history.map((response, idx) => {
                    return (
                      <div
                        key={idx}
                        className="border border-slate-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => setExpanded(expanded === idx ? null : idx)}
                          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 text-left">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                              {
                                statusConfig[
                                  response.verification_status as keyof typeof statusConfig
                                ].icon
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-slate-900 text-sm">
                                {String(
                                  statusConfig[
                                    response.verification_status as keyof typeof statusConfig
                                  ].label,
                                )}{" "}
                                on {response.actedAt}
                              </div>
                            </div>
                          </div>
                          {expanded === idx ? (
                          <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        )}
                        </button>

                        {expanded === idx && (
                          <div className="p-4 bg-red-50 border-t border-slate-200 space-y-4">
                            {/* Submitted At */}
                            <div>
                              <h4 className="font-semibold text-slate-900 text-sm mb-2">
                                Submitted At
                              </h4>
                              <p className="text-sm text-slate-700">
                                {response.actedAt}
                              </p>
                            </div>

                            {/* Rejection Reason */}
                            <div>
                              <h4 className="font-semibold text-red-900 text-sm mb-2">
                                Rejection Reason
                              </h4>
                              <p className="text-sm text-red-800">
                                {response.rejection_reason}
                              </p>
                            </div>

                            {/* Documents Uploaded */}
                            <div>
                              <h4 className="font-semibold text-slate-900 text-sm mb-2">
                                Documents Uploaded
                              </h4>
                              <div className="space-y-2">
                               
                                    <div
                                      className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200"
                                    >
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
                                        Documne
                                      </span>
                                      <button
                                        // onClick={() => setViewingDocument(doc)}
                                        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                                      >
                                        View
                                      </button>
                                    </div>
                                  
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ClayButton variant="primary" size="lg" className="flex-1">
                Go to Login
              </ClayButton>
              <ClayButton variant="secondary" size="lg" className="flex-1">
                Contact Support
              </ClayButton>
            </div>

            {/* Info Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
              <p className="text-sm text-slate-600">
                {/* Usually, reviews are completed within 24-48 business hours. If you need immediate assistance, please reference your submission ID: <span className="font-semibold">{submissionId}</span>. */}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Document Viewer Modal */}
      {/* <DocumentViewerModal
        isOpen={viewingDocument !== null}
        onClose={() => setViewingDocument(null)}
        documentName={viewingDocument || ''}
      /> */}
    </>
  );
};

export default DoctorPendingApprovals;
