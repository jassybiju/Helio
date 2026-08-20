import { useMutation } from "@tanstack/react-query";
import { doctorConsultationService } from "../../../services/consultation.service";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useDoctorVitalsUpdateMutations = (id: string) => {
  return useMutation({
    mutationFn: (data: {
      bloodPressure: number | null;
      oxygenLevel: number| null;
      temperature: number| null;
      weight: number| null;
      height: number| null;
      heartRate: number| null;
    }) => doctorConsultationService.updateVitals(id, data),
    onSuccess(){
      toast.success("Vitals Updated successfully")
    },
    onError(error){
      if(isAxiosError(error)){

        toast.error(error.response?.data.message)
      }
    }
  });
};
