import { apiRequest } from "@/src/libs/axios.config"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"
import { APPOINTMENT_STATUS, CONSULTATION_TYPE } from "@/src/types/appointment.types"

export type APPOINTMENT_LIST = {
  id : string,
  patientName :string,
  time : Date,
  type : string,
  status : string,
  paymentStatus : string
}

export const doctorAppointmentService = {
  getAppointment : ({search, date, status, type,page,limit} : {search? : string, date? : string, status? :APPOINTMENT_STATUS, type? : CONSULTATION_TYPE, page : number, limit : number }) => {
    return apiRequest('/doctor/appointment', HTTP_METHOD.GET, null, {search, date, status, type, limit,page}) as Promise<APIResponse<{data : APPOINTMENT_LIST[], pagination : {totalCount : number, page : number, limit : number} }>>
  }
}