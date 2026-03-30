"use client";

import React from "react";
import { useAdminPatient } from "../hooks/useAdminPatient";
import { ChevronLeft, ChevronRight, Eye, Lock, X } from "lucide-react";
import TableComponent from "@/src/components/TableComponent";
import AdminFilterSelect from "../../components/AdminFilterSelect";

const AdminPatientComponent = () => {
  const {
    totalPages,
    totalCount,
    showAdvancedSearch,
    setShowAdvancedSearch,
    filter,
    setFilter,
    patients,
    columns,
  } = useAdminPatient();
  console.log(totalPages);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Patient Management
        </h2>
        <p className="text-slate-600 mt-1">
          Total {totalCount} registered patients
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, email, phone, or ID..."
          value={filter.search ?? ""}
          onChange={(e) => {
            setFilter((prev) => ({ ...prev, search: e.target.value, page: 1 }));
          }}
          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
        />
        <button
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          ⚙️ Filters
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedSearch && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Advanced Filters</h3>
            <button
              onClick={() => setShowAdvancedSearch(false)}
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* IsVerified Filter */}
          
              <AdminFilterSelect
                value={
                  filter.isVerified === null
                    ? "all"
                    : filter.isVerified
                      ? "verified"
                      : "unverified"
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setFilter((prev) => ({
                    ...prev,
                    isVerified: val === "all" ? null : val === "verified",
                    page: 1,
                  }));
                }}
                title='Verification Status'
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </AdminFilterSelect>

            {/* IsBlocked Filter */}   
            <AdminFilterSelect   value={
                  filter.isBlocked === null
                    ? "all"
                    : filter.isBlocked
                    ? "blocked"
                      : "active"
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setFilter((prev) => ({
                    ...prev,
                    isBlocked: val === "all" ? null : val === "blocked",
                    page: 1,
                  }));
                }}
                
                title='Block Status'>

                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
            </AdminFilterSelect>

            {/* Sort By */}
   

            <AdminFilterSelect title={'sortBy'}  value={filter.sortBy!}
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    sortBy: e.target.value as "firstName" | "createdAt",
                    page: 1,
                  }));
                }}>

                  <option value="firstName">Name</option>
                  <option value="createdAt">Created Date</option>
            </AdminFilterSelect>

            {/* Order */}

            <AdminFilterSelect
              title="Order"
              value={filter.order!}
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  order: e.target.value as "asc" | "desc",
                  page: 1,
                }));
              }}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </AdminFilterSelect>
          </div>

          {/* Date Range Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Created From
              </label>
              <input
                type="date"
                value={filter.createdFrom?.toISOString() ?? ""}
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    createdFromDate: e.target.value,
                    page: 1,
                  }));
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Created To
              </label>
              <input
                type="date"
                value={filter.createdTo?.toISOString()}
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    createdToDate: e.target.value,
                  }));
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              />
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setFilter({
                  search: "",
                  isBlocked: null,
                  isVerified: null,
                  sortBy: "firstName",
                  order: "asc",
                  createdFrom: null,
                  createdTo: null,
                  page: 1,
                });
              }}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <TableComponent data={patients} columns={columns} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Page {filter.page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setFilter((prev) => ({
                  ...prev,
                  page: Math.max(1, prev.page! - 1),
                }))
              }
              disabled={filter.page === 1}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setFilter((prev) => ({ ...prev, page }))}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === filter.page
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setFilter((prev) => ({
                  ...prev,
                  page: Math.min(totalPages, prev.page! + 1),
                }))
              }
              disabled={filter.page === totalPages}
              className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPatientComponent;
