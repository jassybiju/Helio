import { apiRequest } from "@/src/libs/axios.config";
import { DoctorRegisterFormData } from "../schema/registration.schema";

interface RegisterPayload {
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  password: string;
}

export const authService = {
  async register(data: DoctorRegisterFormData): Promise<unknown> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      console.log(key, typeof value)
      if(value instanceof FileList){
        formData.append(key, value[0])
      }else{
        formData.append(key, String(value))
      }
    });

    return apiRequest("/auth/doctor/register", "POST", formData);
  },
};
