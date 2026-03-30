import { apiRequest } from '@/src/libs/axios.config'
import { PatientRegistrationFormData } from '../schemas/auth.schema'
import { HTTP_METHOD } from '@/src/types/API.types'

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

    const [month, day, year] = data.dob.split("/")
    const formattedDob = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`

    const payload : RegisterPayload = data

    const response = await apiRequest('auth/patient/register',"POST", payload)
    return response
  },
  async verify_otp({id , otp }: {id : string, otp : string}) : Promise<unknown>{
    const response = await apiRequest('/auth/patient/verify-otp',"POST", {id, otp})
    return response
  },

  async resend_otp({ id}: { id: string }) {
    const response = await apiRequest("/auth/patient/resend-otp", "POST", {
      id,
    });
    return response;
  },
  async login({email ,password} : {email : string, password : string}) : Promise<unknown> {
    const response = await apiRequest('/auth/patient/login', HTTP_METHOD.POST, {email, password})
    return response
  },

  async forgetPassword({email} : {email : string}){
    const response = await apiRequest('/auth/patient/forget-password', HTTP_METHOD.POST, {email})
    return response
  },

   async resetPassword({token, password} : {token : string, password : string}){
    const response = await apiRequest('/auth/patient/reset-password', HTTP_METHOD.POST, {token,password})
    return response
  }
}