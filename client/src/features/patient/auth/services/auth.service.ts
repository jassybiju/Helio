import { apiRequest } from '@/src/libs/axios.config'
import { PatientRegistrationFormData } from '../schemas/auth.schema'

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
    const response = await apiRequest("/auth/doctor/resend-otp", "POST", {
      id,
    });
    return response;
  },}