import { apiRequest } from "@/src/libs/axios.config";
import { DoctorRegisterFormData } from "../schema/auth.schema";
import { HTTP_METHOD } from "@/src/types/API.types";

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
      console.log(key, typeof value);
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    return apiRequest("/auth/doctor/register", "POST", formData);
  },

  async verify_otp({ id, otp }: { id: string; otp: string }) {
    const response = await apiRequest("/auth/doctor/verify-otp", "POST", {
      id,
      otp,
    });
    console.log(response)
    return response;
  },

  async resend_otp({ id}: { id: string }) {
    const response = await apiRequest("/auth/doctor/resend-otp", "POST", {
      id,
    });
    console.log(response)
    return response;
  },

  async login({email , password} : {email : string, password : string}) {
    const response = await apiRequest('/auth/doctor/login', HTTP_METHOD.POST, {
      email, password
    })
    return response
  }
};
