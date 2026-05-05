import { apiRequest } from "@/src/libs/axios.config"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"
import { BlockDoctorSlotFormData } from "../dashboard/schemas/block-slot.schema"
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants"
import { ApiError } from "next/dist/server/api-utils"

export interface IGetDoctorBlockSlotDTO {
  id : string,
  startDate : string,
  endDate : string,
  reason: string | null
}

export const slotService = {
  getSlot : () => {
    return apiRequest(API_ENDPOINT.DOCTOR.SLOT.BASE, HTTP_METHOD.GET) as Promise<APIResponse<Record<string,{shiftId : string, startTime : string, endTime : string, slots : Array<{appointmentId : string, status : string, id : string}>}[]>>>
  },
  blockSlot : (data : BlockDoctorSlotFormData) => {
    return apiRequest(API_ENDPOINT.DOCTOR.SLOT.BLOCK, HTTP_METHOD.POST, data) 
  },
  getBlockSlot : () => {
    return apiRequest(API_ENDPOINT.DOCTOR.SLOT.BLOCK, HTTP_METHOD.GET)  as Promise<APIResponse<IGetDoctorBlockSlotDTO>>
  }
}