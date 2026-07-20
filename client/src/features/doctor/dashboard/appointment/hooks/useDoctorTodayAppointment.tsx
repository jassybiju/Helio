import React from 'react'
import { useGetDoctorTodaysAppointmentQuery } from './useGetDoctorTodaysAppointmentQuery'
import { useStartDoctorConsultation } from './useStartDoctorConsultation'
import { useSkipAppointmentMutation } from './useSkipAppointmentMutation'

const useDoctorTodayAppointment = () => {
  const {data} = useGetDoctorTodaysAppointmentQuery()

  const {mutate :startConsultation} = useStartDoctorConsultation()
  const {mutate : skipAppointment} = useSkipAppointmentMutation()

  return {
    stats : data?.data.stats,
    ongoingAppointments : data?.data.ongoing ?? [],
    skippedAppointments : data?.data.skipped ?? [],
    next : data?.data.upcoming ?? null,
    startConsultation,
    skipAppointment
  }


}

export default useDoctorTodayAppointment