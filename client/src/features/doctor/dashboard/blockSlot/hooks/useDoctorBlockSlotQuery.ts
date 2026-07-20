import { useQuery } from "@tanstack/react-query"
import { slotService } from "../../../services/slot.service"

export const useDoctorBlockSlotQuery = () => {
  return useQuery({
    queryFn : slotService.getBlockSlot,
    queryKey : ['block-slot']
  })
}