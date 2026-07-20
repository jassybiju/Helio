import { apiRequest } from "@/src/libs/axios.config"
import { invalidateQuery } from "@/src/libs/queryClient"
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants"
import { HTTP_METHOD } from "@/src/types/API.types"
import { useMutation } from "@tanstack/react-query"

export const useAddReviewMutation = (doctorId : string) => {
  return useMutation({
    mutationFn : ({rating, comment} : {rating : number, comment : string})=>{
      return apiRequest(API_ENDPOINT.PATIENT.REVIEW(doctorId), HTTP_METHOD.POST, {rating, comment})
    },
    onSuccess : () => {
      invalidateQuery('doc-slots')
    }
  })
}