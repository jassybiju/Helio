import { PatientRegistrationFormData } from '../schemas/registration.schema'
import { apiRequest } from '@/src/libs/axios.config'

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
  }
}