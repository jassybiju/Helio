import React from "react";

const DoctorViewSkelton = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center gap-4">
          <div className="w-9 h-9 bg-slate-200 rounded-lg animate-pulse" />
          <div className="space-y-2">
            <div className="w-48 h-5 bg-slate-200 rounded animate-pulse" />
            <div className="w-32 h-3 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-slate-200 p-6 space-y-4"
              >
                <div className="w-40 h-5 bg-slate-200 rounded animate-pulse" />
                <div className="grid grid-cols-2 gap-6">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="space-y-2">
                      <div className="w-24 h-3 bg-slate-200 rounded animate-pulse" />
                      <div className="w-36 h-4 bg-slate-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
              <div className="w-32 h-5 bg-slate-200 rounded animate-pulse" />
              <div className="w-full h-10 bg-slate-200 rounded-lg animate-pulse" />
              <div className="w-full h-10 bg-slate-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorViewSkelton;
