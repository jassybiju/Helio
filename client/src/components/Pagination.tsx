"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 4;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > maxButtons) {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        if (currentPage < totalPages) pages.push(currentPage + 1);
      } else {
        if (currentPage < 3) {
          pages.push(1);
          pages.push(2);
          pages.push(3);
        } else {
          for (let i = 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
        }
      }

      if (currentPage < totalPages - 1) {
        pages.push("...");
        pages.push(totalPages);
      } else {
        // pages.push(totalPages-1)
        // pages.push(totalPages)
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="border-t border-slate-200 px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {" "}
      <div className="flex items-center justify-center sm:justify-start gap-2">
        {" "}
        <span className="text-sm text-slate-600 hidden sm:block">Show</span>
        <span className="font-semibold text-slate-900">
          {/* {ITEMS_PER_PAGE} per page */}
        </span>
      </div>
      <div className="flex items-center justify-center sm:justify-start gap-2">
        {" "}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {" "}
          {pages.map((page, i) => (
            <button
              key={i}
              disabled={page === "..."}
              onClick={() => onPageChange(page as number)}
              className={`w-9 h-9 flex-shrink-0 rounded-lg font-semibold text-sm transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
