import { invalidateQuery } from "@/src/libs/queryClient";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { appointmentService } from "../../../services/appointment.service";

export const usePatientCheckoutMutation = (id: string) => {
  return useMutation({
    mutationFn: (type: string) => appointmentService.postCheckout(id, type),
    onSuccess() {
      toast.success("Checkout Successfuly");
      invalidateQuery("checkout");
    },
    onError(error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });
};
