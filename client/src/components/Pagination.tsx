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
    const maxButtons = 5;
    console.log(totalPages)
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
        if (currentPage < totalPages ) pages.push(currentPage + 1);
      } else {
        pages.push(1);
        pages.push(2);
        pages.push(3);
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
    // <div className="flex items-center justify-center gap-2 mt-12">
    //   <button
    //     onClick={() => onPageChange(currentPage - 1)}
    //     disabled={currentPage === 1}
    //     className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    //     aria-label="Previous page"
    //   >
    //     ‹
    //   </button>

    //   {pages.map((page, idx) => {
    //     if (page === '...') {
    //       return (
    //         <span key={idx} className="px-3 py-2 text-gray-500">
    //           ...
    //         </span>
    //       )
    //     }

    //     const pageNum = page as number
    //     const isActive = pageNum === currentPage

    //     return (
    //       <button
    //         key={pageNum}
    //         onClick={() => onPageChange(pageNum)}
    //         className={`w-10 h-10 rounded-lg font-medium transition ${
    //           isActive
    //             ? 'bg-blue-600 text-white'
    //             : 'text-gray-700 hover:bg-gray-100'
    //         }`}
    //       >
    //         {pageNum}
    //       </button>
    //     )
    //   })}

    //   <button
    //     onClick={() => onPageChange(currentPage + 1)}
    //     disabled={currentPage === totalPages}
    //     className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    //     aria-label="Next page"
    //   >
    //     ›
    //   </button>
    // </div>

    <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600">Show</span>
        <span className="font-semibold text-slate-900">
          {/* {ITEMS_PER_PAGE} per page */}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page,i) => (
            <button
              key={i}
              disabled={page === "..."}
              onClick={() => onPageChange(page as number)}
              className={`w-8 h-8 rounded-lg font-semibold text-sm transition ${
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
