import { apiRequest } from "@/src/libs/axios.config";
import { invalidateQuery } from "@/src/libs/queryClient";
import { HTTP_METHOD } from "@/src/types/API.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const useAddSpecialtyMutation = () => {
  return useMutation({
    mutationFn: (data) => apiRequest("admin/specialty", HTTP_METHOD.POST, data),
    onSuccess() {
      invalidateQuery("specialty");
      toast.success("Specialty Saved Successfulyy")
    },
    onError(error){
      if(isAxiosError(error))
      toast.error(error.response?.data.message)
    }
  });
};
