'use client'

import { useSpecialtyQuery } from '@/src/hooks/useSpecialtyQuery'
import { useState } from 'react'

export type SearchDoctorsQueryParams = {
  name?: string
  specialization?: string
  consultationType?: 'ONLINE' | 'CLINIC'
  date?: string
  experienceYears?: number
  minFee?: number
  maxFee?: number
}

interface FilterSidebarProps {
  onFiltersChange: (filters: SearchDoctorsQueryParams) => void
}

export default function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<SearchDoctorsQueryParams>({})
  const {data} = useSpecialtyQuery()
  const updateFilters = (updated: Partial<SearchDoctorsQueryParams>) => {
    const newFilters = { ...filters, ...updated }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
    onFiltersChange({})
  }

  return (
    <div className="w-64 text-black bg-white rounded-lg p-6 h-fit sticky top-24">
      <h2 className="text-lg font-bold mb-6">Filters</h2>

      {/* 🔍 Search */}
      <div className="mb-6">
        <label className="text-xs font-semibold mb-2 block">Search</label>
        <input
          type="text"
          placeholder="Search doctor name..."
          value={filters.name || ''}
          onChange={(e) => updateFilters({ name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* 🩺 Specialization */}
      <div className="mb-6">
        <label className="text-xs font-semibold mb-2 block">Specialization</label>
        <select
          value={filters.specialization || ''}
          onChange={(e) => updateFilters({ specialization: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">All</option>
          {data?.data?.specialty.map(x =>(
          <option key={x.value} value={x.value}>{x.label} </option>
            
          ))}
        </select>
      </div>

      {/* 💻 Consultation Type */}
      <div className="mb-6">
        <label className="text-xs font-semibold mb-2 block">
          Consultation Type
        </label>

        <div className="flex flex-col gap-2">
          <label className="flex gap-2">
            <input
              type="radio"
              checked={filters.consultationType === 'ONLINE'}
              onChange={() => updateFilters({ consultationType: 'ONLINE' })}
            />
            Online
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={filters.consultationType === 'CLINIC'}
              onChange={() => updateFilters({ consultationType: 'CLINIC' })}
            />
            In Clinic
          </label>
        </div>
      </div>

      {/* 📅 Availability Date */}
      <div className="mb-6">
        <label className="text-xs font-semibold mb-2 block">
          Availability Date
        </label>
        <input
          type="date"
          value={filters.date || ''}
          onChange={(e) => updateFilters({ date: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* 🧠 Experience */}
      {/* <div className="mb-6">
        <label className="text-xs font-semibold mb-2 block">
          Minimum Experience (years)
        </label>
        <input
          type="number"
          min={0}
          value={filters.experienceYears || ''}
          onChange={(e) =>
            updateFilters({
              experienceYears: Number(e.target.value) || undefined,
            })
          }
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
      </div> */}

      {/* 💰 Fee Range */}
      <div className="mb-6">
        <label className="text-xs font-semibold mb-2 block">
          Consultation Fee
        </label>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minFee || ''}
            onChange={(e) =>
              updateFilters({
                minFee: Number(e.target.value) || undefined,
              })
            }
            className="w-1/2 px-2 py-2 border rounded text-sm"
          />

          <input
            type="number"
            placeholder="Max"
            value={filters.maxFee || ''}
            onChange={(e) =>
              updateFilters({
                maxFee: Number(e.target.value) || undefined,
              })
            }
            className="w-1/2 px-2 py-2 border rounded text-sm"
          />
        </div>
      </div>

      {/* ❌ Clear */}
      <button
        onClick={handleClearFilters}
        className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-lg"
      >
        Clear Filters
      </button>
    </div>
  )
}