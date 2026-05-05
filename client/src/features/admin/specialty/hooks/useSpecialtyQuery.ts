import { apiRequest } from "@/src/libs/axios.config"
import { HTTP_METHOD } from "@/src/types/API.types"
import { useQuery } from "@tanstack/react-query"

export const useSpecialtyQuery = () => {
  return useQuery({
    queryKey : ['specialty'],
    queryFn :()=> apiRequest<{label : string, value : string}>('/specialty', HTTP_METHOD.GET)
  })
}