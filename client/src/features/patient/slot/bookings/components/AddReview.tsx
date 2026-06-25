'use client'

import { useState } from 'react'
import { Star, Send } from 'lucide-react'
import ClayButton from '@/src/components/ui/ClayButton'

interface AddReviewProps {
  doctorId: string
}

export function AddReview({ doctorId }: AddReviewProps) {
  const [rating, setRating] = useState<number>(5)
  const [comment, setComment] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [hoveredRating, setHoveredRating] = useState<number>(0)

  const handleSubmit = () => {
    if (author.trim() && comment.trim()) {
      onReviewSubmit({
        rating,
        comment,
        author,
      })
      setRating(5)
      setComment('')
      setAuthor('')
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Share Your Experience</h3>
      <p className="text-sm text-gray-600 mb-6">Have you been treated by {'doctor'}? Help other patients by sharing your review.</p>

      {isSubmitted ? (
        <div className="py-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-3">
            <Send className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-green-700 font-medium">Thank you for your review!</p>
          <p className="text-sm text-gray-600 mt-1">Your review has been submitted successfully.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Rating Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Your Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Author Name */}
         
          {/* Review Comment */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Your Review</label>
            <textarea
              placeholder="Share your experience with the doctor..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{comment.length}/500 characters</p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <ClayButton
              onClick={handleSubmit}
              // disabled={!comment.trim()}
              className="flex bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Review
            </ClayButton>
          </div>
        </div>
      )}
    </div>
  )
}
