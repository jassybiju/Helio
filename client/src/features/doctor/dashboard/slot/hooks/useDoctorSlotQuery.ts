import { useQuery } from "@tanstack/react-query"
import { slotService } from "../../../services/slot.service"

export const useDoctorSlotQuery = () => {
  return useQuery({
    queryKey : ['slots'],
    queryFn : slotService.getSlot,
    
  })
}