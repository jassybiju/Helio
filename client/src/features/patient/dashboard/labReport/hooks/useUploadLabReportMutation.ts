import { useMutation } from "@tanstack/react-query"
import { appointmentService } from "../../../services/appointment.service"
import { invalidateQuery } from "@/src/libs/queryClient";


export const useUploadLabReportMutation = (reportId: string) => {
return useMutation({
    mutationFn : (data: File)=>appointmentService.uploadLabReport(reportId,data ),
    onSuccess(){
      invalidateQuery('lab-report')
    }
  })
}