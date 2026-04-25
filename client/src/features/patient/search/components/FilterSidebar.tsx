'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FilterSidebarProps {
  onFiltersChange: (filters: object) => void
}

export default function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<Record<string, string[]>>({
    specialty: [],
    consultationType: [],
    availability: [],
    experience: [],
    rating: [],
  } )

  const handleSpecialtyChange = (specialty: string) => {
    const updated = filters.specialty.includes(specialty)
      ? filters.specialty.filter(s => s !== specialty)
      : [...filters.specialty, specialty]
    const newFilters = { ...filters, specialty: updated }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleConsultationTypeChange = (type: string) => {
    const updated = filters.consultationType.includes(type)
      ? filters.consultationType.filter(t => t !== type)
      : [...filters.consultationType, type]
    const newFilters = { ...filters, consultationType: updated }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleAvailabilityChange = (availability: string) => {
    const updated = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability]
    const newFilters = { ...filters, availability: updated }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleExperienceChange = (exp: string) => {
    const updated = filters.experience.includes(exp)
      ? filters.experience.filter(e => e !== exp)
      : [...filters.experience, exp]
    const newFilters = { ...filters, experience: updated }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleRatingChange = (rating: string) => {
    const updated = filters.rating.includes(rating)
      ? filters.rating.filter(r => r !== rating)
      : [...filters.rating, rating]
    const newFilters = { ...filters, rating: updated }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    const cleared = {
      specialty: [],
      consultationType: [],
      availability: [],
      experience: [],
      rating: [],
    }
    setFilters(cleared)
    onFiltersChange(cleared)
  }

  return (
    <div className="w-64 bg-white rounded-lg p-6 h-fit sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Filters</h2>

      {/* Search */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Doctor, clinic, specialty..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Specialty */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 block">
          Specialty
        </label>
        <div className="space-y-2">
          {['Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist'].map((spec) => (
            <label key={spec} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.specialty.includes(spec)}
                onChange={() => handleSpecialtyChange(spec)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{spec}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-700">
          Show 12 more
        </button>
      </div>

      {/* Consultation Type */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 block">
          Consultation Type
        </label>
        <div className="space-y-2">
          {['Online', 'In-Clinic'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="consultation"
                checked={filters.consultationType.includes(type)}
                onChange={() => handleConsultationTypeChange(type)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 block">
          Availability
        </label>
        <div className="space-y-2">
          {['Available Today', 'Available this Week'].map((avail) => (
            <label key={avail} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.availability.includes(avail)}
                onChange={() => handleAvailabilityChange(avail)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{avail}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 block">
          Experience
        </label>
        <div className="space-y-2">
          {['0-5 years', '5-10 years', '10+ years'].map((exp) => (
            <label key={exp} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="experience"
                checked={filters.experience.includes(exp)}
                onChange={() => handleExperienceChange(exp)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">{exp}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Consultation Fee */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 block">
          Consultation Fee ($)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Min"
            className="w-16 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400">to</span>
          <input
            type="text"
            placeholder="Max"
            className="w-16 px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Patient Rating */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 block">
          Patient Rating
        </label>
        <div className="space-y-2">
          {['5.0', '4.0+'].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">
                {rating === '5.0' ? '⭐⭐⭐⭐⭐ 5.0' : '⭐⭐⭐⭐ 4.0+'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleClearFilters}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 rounded-lg transition"
      >
        Clear All Filters
      </button>
    </div>
  )
}
