import { useMutation } from '@tanstack/react-query'
import { doctorConsultationService } from '../../../services/consultation.service'
import { toast } from 'react-toastify'
import { invalidateQuery } from '@/src/libs/queryClient'

const useDoctorAddTestMutation = (id : string) => {
  return useMutation({
    mutationFn :(data : {testName : string, instructions : string}) =>doctorConsultationService.addTest(id, data),
    onSuccess(data){
      toast.success(data.message)
      invalidateQuery("consultation")
    }
  })
}

export default useDoctorAddTestMutation