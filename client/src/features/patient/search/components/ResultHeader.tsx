"use client";

interface ResultsHeaderProps {
  totalDoctors: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ResultsHeader({
  totalDoctors,
  sortBy,
  onSortChange,
}: ResultsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      {" "}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Find a Doctor</h1>
        <p className="text-gray-600 mt-1">
          {totalDoctors} specialized doctors found in your area
        </p>
      </div>
      {/* <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="recommended">Recommended</option>
          <option value="rating">Highest Rating</option>
          <option value="experience">Most Experience</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div> */}
    </div>
  );
}
