import DoctorBookingComponent from '@/src/features/patient/bookings/components/DoctorBookingComponent'
import React from 'react'

const DoctorBookingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  return (
    <DoctorBookingComponent id={id}/>
  )
}

export default DoctorBookingPage