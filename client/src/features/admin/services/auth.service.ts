import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { HTTP_METHOD } from "@/src/types/API.types";



export const authService = {


  async login({email , password} : {email : string, password : string}) {
    const response = await apiRequest(API_ENDPOINT.ADMIN.AUTH.LOGIN, HTTP_METHOD.POST, {
      email, password
    })
    return response
  }
};
