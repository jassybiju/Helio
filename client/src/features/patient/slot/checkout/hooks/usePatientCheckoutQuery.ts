import { useQuery } from "@tanstack/react-query"
import { appointmentService } from "../../../services/appointment.service"

export const usePatientCheckoutQuery = (id : string) => {
  return useQuery({
    queryKey : ['checkout'],
    queryFn : ()=>appointmentService.getCheckout(id)
  })
}