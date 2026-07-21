import { useMutation } from '@tanstack/react-query'
import { doctorConsultationService } from '../../../services/consultation.service'
import { toast } from 'react-toastify'
import { invalidateQuery } from '@/src/libs/queryClient'

const useDoctorRemoveTestMutation = (id : string) => {
  return useMutation({
    mutationFn :(testId : string) =>doctorConsultationService.removeTest(id, testId),
    onSuccess(data){
      toast.success(data.message)
      invalidateQuery("consultation")
    }
  })
}

export default useDoctorRemoveTestMutation