import { useMutation } from "@tanstack/react-query";
import { doctorConsultationService } from "../../../services/consultation.service";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export const useDoctorConsultationNotesMutation = (id: string) => {
  return useMutation({
    mutationFn: (data: {
      clinicalObservations: string | null;
      quickNote: string | null;
      medicationPeriod: number | null; 
      generalAdvice: string | null;
      primaryDiagnosis: string | null; 
    }) => doctorConsultationService.updateNotes(id, data),
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
