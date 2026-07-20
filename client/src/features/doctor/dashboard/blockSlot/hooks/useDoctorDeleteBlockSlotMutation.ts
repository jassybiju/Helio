import { useMutation } from "@tanstack/react-query"
import { slotService } from "../../../services/slot.service"
import { invalidateQuery } from "@/src/libs/queryClient"
import { toast } from "react-toastify"

export const useDoctorDeleteBlockSlotMutation = () => {
  return useMutation({
    mutationFn : slotService.deleteBlockSlot,
    onSuccess(data){
      invalidateQuery('block-slot')
      toast.success(data.message)
    }
  })
}