import ViewDoctorConsultationComponent from '@/src/features/doctor/dashboard/consultation/components/ViewDoctorConsultationComponent'
import React from 'react'

const ViewDoctorConsultationPage =async ({params} : {params : Promise<{id : string}>}) => {
  const {id} = await params
  return (<ViewDoctorConsultationComponent id={id}/>
  )
}

export default ViewDoctorConsultationPage