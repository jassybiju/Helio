import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "../libs/axios.config"
import { APIResponse, HTTP_METHOD } from "../types/API.types"

export const useSpecialtyQuery = ()=> {
  return useQuery({
    queryKey : ['specialty'],
    queryFn : ()=>apiRequest('/specialty', HTTP_METHOD.GET) as Promise<APIResponse<{label : string, value : string}[]>>
  })
}