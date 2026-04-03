import { apiRequest } from "@/src/libs/axios.config";
import { DoctorRegisterFormData } from "../schema/auth.schema";
import { HTTP_METHOD } from "@/src/types/API.types";
import {
  GoogleLoginFn,
  LoginResponse,
} from "@/src/features/auth/types/auth.types";

// interface RegisterPayload {
//   first_name: string;
//   last_name: string;
//   gender: string;
//   dob: string;
//   email: string;
//   phone: string;
//   password: string;
// }

export const authService = {
  register(data: DoctorRegisterFormData): Promise<unknown> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      console.log(key, typeof value);
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else {
        formData.append(key, String(value));
      }
    });

    return apiRequest("/doctor/auth/register", "POST", formData);
  },

  verify_otp({ id, otp }: { id: string; otp: string }) {
    return apiRequest("/doctor/auth/verify-otp", "POST", {
      id,
      otp,
    });
  },

  resend_otp({ id }: { id: string }) {
    return apiRequest("/doctor/auth/resend-otp", "POST", {
      id,
    });
  },

  login({ email, password }: { email: string; password: string }) {
    return apiRequest("/doctor/auth/login", HTTP_METHOD.POST, {
      email,
      password,
    });
  },

  forgetPassword({ email }: { email: string }) {
    return apiRequest("/doctor/auth/forget-password", HTTP_METHOD.POST, {
      email,
    });
  },

  resetPassword({ token, password }: { token: string; password: string }) {
    return apiRequest("/doctor/auth/reset-password", HTTP_METHOD.POST, {
      token,
      password,
    });
  },
  googleLogin({ credential }: { credential: string }): Promise<LoginResponse> {
    return apiRequest<LoginResponse>("/doctor/auth/google", HTTP_METHOD.POST, {
      credential,
    });
  },
};
