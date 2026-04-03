import { apiRequest } from "@/src/libs/axios.config";
import { HTTP_METHOD } from "@/src/types/API.types";



export const authService = {


  async login({email , password} : {email : string, password : string}) {
    const response = await apiRequest('/admin/auth/login', HTTP_METHOD.POST, {
      email, password
    })
    return response
  }
};
