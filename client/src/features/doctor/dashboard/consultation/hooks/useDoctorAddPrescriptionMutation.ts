import { useMutation } from "@tanstack/react-query"
import { doctorConsultationService } from "../../../services/consultation.service"
import { invalidateQuery } from "@/src/libs/queryClient";
import { toast } from "react-toastify";

export const useDoctorAddPrescription = (id : string) => {
  return useMutation({
    mutationFn : (data : { name: string;
      foodTiming: 0 | 1;
      timings: { morning: boolean; afternoon: boolean; night: boolean };
      durationInDays: number;
      instruction: string | null;}) => doctorConsultationService.addPrescription(id, data),
      onSuccess(){
        invalidateQuery('consultation')
        toast.success("Prescription Added Succesfllly")
      }
  })
}