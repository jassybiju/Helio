'use client'

import React, { useEffect, useState } from 'react'
import { Trash2, Calendar, Clock, MapPin } from 'lucide-react'
import { apiRequest } from '@/src/libs/axios.config'
import { HTTP_METHOD } from '@/src/types/API.types'

interface SlotItem {
  id: string
  appointmentId: string | null
  status: string
}

interface GroupedSlot {
  shiftId: string
  startTime: string
  endTime: string
  slots: SlotItem[]
}

type ApiResponse = Record<string, GroupedSlot[]>

const DoctorSlotComponent = () => {
  const [slotsByDay, setSlotsByDay] = useState<ApiResponse>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const json = await apiRequest('/doctor/slot', HTTP_METHOD.GET)
        console.log(json)
        setSlotsByDay(json?.data ?? {})
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSlots()
  }, [])

  const daysOrder = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'text-green-600'
      case 'BOOKED':
        return 'text-blue-600'
      case 'CANCELLED':
        return 'text-red-600'
      default:
        return 'text-slate-600'
    }
  }

  if (loading) {
    return <p className="text-center py-10">Loading slots...</p>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          All Consultation Slots
        </h1>
        <p className="text-slate-600 mt-2">
          View your weekly schedule
        </p>
      </div>

      {/* Days */}
      <div className="space-y-10">
        {daysOrder.map((day) => {
          const daySlots = slotsByDay[day]

          if (!daySlots || daySlots.length === 0) return null

          return (
            <div key={day}>
              {/* Day Header */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-slate-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  {day} {new Date(daySlots[0]?.startTime).toLocaleDateString()}
                </h2>
              </div>

              {/* Slot Groups */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {daySlots.map((group, index) => (
                  <div
                    key={`${group.shiftId}-${group.startTime}-${index}`}
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition"
                  >
                    {/* Time */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-slate-600">
                          Time Slot
                        </span>
                      </div>

                      <p className="text-lg font-semibold">
                        {new Date(group.startTime).toLocaleTimeString(
                          'en-IN',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Asia/Kolkata',
                          }
                        )}{' '}
                        -{' '}
                        {new Date(group.endTime).toLocaleTimeString(
                          'en-IN',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Asia/Kolkata',
                          }
                        )}
                      </p>
                    </div>

                    {/* Shift ID */}
                    <p className="text-xs text-slate-500 mb-3">
                      Shift: {group.shiftId}
                    </p>

                    {/* Slot count */}
                    <div className="mb-3">
                      <span className="px-2 py-1 text-xs bg-slate-100 rounded">
                        {group.slots.length} slots
                      </span>
                    </div>

                    {/* Slots */}
                    <div className="space-y-1">
                      {group.slots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex justify-between text-sm border-b pb-1"
                        >
                          <span className="text-slate-700">
                            {slot.id}
                          </span>

                          <span
                            className={`text-xs font-medium ${getStatusColor(
                              slot.status
                            )}`}
                          >
                            {slot.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty state */}
      {Object.keys(slotsByDay).length === 0 && (
        <div className="text-center py-10 text-slate-500">
          No slots available
        </div>
      )}
    </div>
  )
}

export default DoctorSlotComponent