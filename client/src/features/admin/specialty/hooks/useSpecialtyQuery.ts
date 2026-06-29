import { apiRequest } from "@/src/libs/axios.config"
import { HTTP_METHOD } from "@/src/types/API.types"
import { useQuery } from "@tanstack/react-query"

export const useSpecialtyQuery = ({page} : {page : number}) => {
  return useQuery({
    queryKey : ['specialty', {page}],
    queryFn :()=> apiRequest<{label : string, value : string}>('/admin/specialty/', HTTP_METHOD.GET, null, {page})
  })
}