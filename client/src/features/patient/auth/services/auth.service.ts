import { apiRequest } from '@/src/libs/axios.config'
import { PatientRegistrationFormData } from '../schemas/auth.schema'
import { HTTP_METHOD } from '@/src/types/API.types'
import { LoginResponse } from '@/src/features/auth/types/auth.types'

interface RegisterPayload {
  first_name : string,
  last_name : string,
  gender : string,
  dob: string,
  email : string,
  phone : string,
  password : string
}

export const authService = {
  async register(data : PatientRegistrationFormData) : Promise<unknown>{

    const payload : RegisterPayload = data

    const response = await apiRequest('/patient/auth/register',"POST", payload)
    return response
  },
  async verify_otp({id , otp }: {id : string, otp : string}) : Promise<unknown>{
    const response = await apiRequest('/patient/auth/verify-otp',"POST", {id, otp})
    return response
  },

  async resend_otp({ id}: { id: string }) {
    const response = await apiRequest("/patient/auth/resend-otp", "POST", {
      id,
    });
    return response;
  },
  async login({email ,password} : {email : string, password : string}) : Promise<unknown> {
    const response = await apiRequest('/patient/auth/login', HTTP_METHOD.POST, {email, password})
    return response
  },

  async forgetPassword({email} : {email : string}){
    const response = await apiRequest('/patient/auth/forget-password', HTTP_METHOD.POST, {email})
    return response
  },

   async resetPassword({token, password} : {token : string, password : string}){
    const response = await apiRequest('/patient/auth/reset-password', HTTP_METHOD.POST, {token,password})
    return response
  },
   googleLogin({credential} : {credential : string}) : Promise<LoginResponse>{
    return apiRequest('/patient/auth/google',HTTP_METHOD.POST,{credential})
  }
}