"use client";

import React, { useState } from "react";
import {  CheckCircle, Eye } from "lucide-react";
import { useGetLabReportQuery } from "../hooks/useGetLabReportQuery";
import { useModal } from "@/src/hooks/useModal";
import  PatientUploadLabReportModal  from "./PatientUploadLabReportModal";
import ViewPDFModal from "@/src/components/ViewPDFModal";



const LIMIT = 4;
const PatientLabReportComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetLabReportQuery({ limit: LIMIT, page: currentPage });
  const {open} = useModal()


  const openViewPDFModal = (file : string, title : string) => {
    open(ViewPDFModal, {file , title  })
  }
  const openUploadModal = (testName : string, reportId : string) => {
    open(PatientUploadLabReportModal, {testName, reportId})
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Lab Reports</h1>
        <p className="text-slate-500">Manage Your Medical Reports</p>
      </div>

      {/* Lab Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            📋 Lab Requests
          </h2>
          {/* <span className="text-sm text-slate-600">3 Pending Requests</span> */}
        </div>

        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Status
                </th>
              
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.requested.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {request.testName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {request.instructions}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(request.requestedAt).toDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      REQUESTED
                    </span>
                  </td>
                 
                  <td className="px-6 py-4">
                    <button onClick={()=>openUploadModal(request.testName, request.id)} className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                      📄 Upload Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Filters */}
        {/* <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                Date Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-slate-500">to</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="uploaded">Uploaded</option>
                <option value="requested">Requested</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                Apply Filters
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Uploaded Lab Reports Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Uploaded Lab Reports
          </h2>
          {/* <span className="text-sm text-slate-600">12 Total Reports</span> */}
        </div>

        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.uploaded.reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 text-lg">📄</span>
                      </div>
                      <span className="font-semibold text-slate-900">
                        {report.testName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {report.uploadedAt ?new Date(report.uploadedAt).toDateString():"-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                      UPLOADED
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <button onClick={()=>openViewPDFModal(report.documentKey!, report.testName)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition"
                      title="View"
                    >
                      <Eye className="w-5 h-5 text-slate-600" />
                    </button>
                    {/* <button
                      className="p-2 hover:bg-slate-100 rounded-lg transition"
                      title="Download"
                    >
                      <Download className="w-5 h-5 text-slate-600" />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination
        <div className="flex items-center justify-between">
          {/* <p className="text-sm text-slate-600">
            Showing 1-{Math.min(itemsPerPage, uploadedReports.length)} of{" "}
            {uploadedReports.length} reports
          </p> */}
          {/* <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-slate-600 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div> */} 
      </div>
    </div>
  );
};

export default PatientLabReportComponent;
