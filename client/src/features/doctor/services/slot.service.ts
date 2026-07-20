import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import { BlockDoctorSlotFormData } from "../dashboard/schemas/block-slot.schema";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";

export interface IGetDoctorBlockSlotDTO {
  id: string;
  startDate: string;
  endDate: string;
  reason: string | null;
}

export const slotService = {
  getSlot: () => {
    return apiRequest(
      API_ENDPOINT.DOCTOR.SLOT.BASE,
      HTTP_METHOD.GET,
    ) as Promise<
      APIResponse<{
        slots: Record<
          string,
          {
            shiftId: string;
            startTime: string;
            endTime: string;
            slots: Array<string>;
          }[]
        >;
      }>
    >;
  },
  blockSlot: (data: BlockDoctorSlotFormData) => {
    return apiRequest(
      API_ENDPOINT.DOCTOR.SLOT.BLOCK.BASE,
      HTTP_METHOD.POST,
      data,
    );
  },
  getBlockSlot: () => {
    return apiRequest(
      API_ENDPOINT.DOCTOR.SLOT.BLOCK.BASE,
      HTTP_METHOD.GET,
    ) as Promise<APIResponse<IGetDoctorBlockSlotDTO[]>>;
  },
  deleteBlockSlot: (id: string) => {
    return apiRequest(
      API_ENDPOINT.DOCTOR.SLOT.BLOCK.ID(id),
      HTTP_METHOD.DELETE,
    );
  },
};
