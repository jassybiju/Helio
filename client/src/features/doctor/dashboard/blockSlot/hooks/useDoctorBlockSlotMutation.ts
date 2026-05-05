import { useMutation } from "@tanstack/react-query"
import { slotService } from "../../../services/slot.service"
import { BlockDoctorSlotFormData } from "../../schemas/block-slot.schema"

export const useDoctorBlockSlotMutation = () => {
  return useMutation({
    mutationFn : (data : BlockDoctorSlotFormData) => slotService.blockSlot(data)
  })
}