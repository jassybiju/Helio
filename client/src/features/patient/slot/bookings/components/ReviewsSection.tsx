"use client";

import Pagination from "@/src/components/Pagination";
import { Star } from "lucide-react";

interface Review {
  profilePic : string
  id: string;
  patientName: string;
  createdAt: string;
  ratings: number;
  comments: string;
  
}

interface ReviewsSectionProps {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  currentPage :number,
  totalPage : number,
  totalReviewCount : number[]
  onPageChange : (page : number) => void
}

export function ReviewsSection({
  averageRating,
  totalReviews,
  reviews,
  currentPage,
  totalPage,
  onPageChange,
  totalReviewCount
}: ReviewsSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Patient Reviews
        </h3>

        {/* Rating Summary */}
        <div className="flex items-start gap-8">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">{totalReviews} reviews</p>
          </div>

          {/* Rating Bars */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-8">{stars} ★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={
                      {
                        width: `${(totalReviewCount[stars-1] / totalReviews * 100).toFixed(0)}%`,
                      }
                    }
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{totalReviewCount[stars-1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="border-t border-gray-200 pt-8">
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="pb-6 border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              {/* Review Header */}
              <div className="flex items-start gap-4 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm flex-shrink-0">
                  {review.profilePic}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-gray-900">
                      {review.patientName}
                    </h4>
                    <span className="text-sm text-gray-500">{review.createdAt}</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.ratings
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed ml-14">
                {review.comments}
              </p>
            </div>
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange}/>
      </div>
    </div>
  );
}
