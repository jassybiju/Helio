import { apiRequest } from "@/src/libs/axios.config";
import { DoctorRegisterFormData } from "../auth/schema/auth.schema";
import { HTTP_METHOD } from "@/src/types/API.types";
import {
  GoogleLoginFn,
  LoginResponse,
} from "@/src/features/auth/types/auth.types";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";

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

    return apiRequest(API_ENDPOINT.DOCTOR.AUTH.REGISTER, "POST", formData);
  },

  verify_otp({ id, otp }: { id: string; otp: string }) {
    return apiRequest(API_ENDPOINT.DOCTOR.AUTH.VERIFY_OTP, "POST", {
      id,
      otp,
    });
  },

  resend_otp({ id }: { id: string }) {
    return apiRequest(API_ENDPOINT.DOCTOR.AUTH.RESEND_OTP, "POST", {
      id,
    });
  },

  login({ email, password }: { email: string; password: string }) {
    return apiRequest(API_ENDPOINT.DOCTOR.AUTH.LOGIN, HTTP_METHOD.POST, {
      email,
      password,
    });
  },

  forgetPassword({ email }: { email: string }) {
    return apiRequest(API_ENDPOINT.DOCTOR.AUTH.FORGET_PASSWORD, HTTP_METHOD.POST, {
      email,
    });
  },

  resetPassword({ token, password }: { token: string; password: string }) {
    return apiRequest(API_ENDPOINT.DOCTOR.AUTH.RESET_PASSWORD, HTTP_METHOD.POST, {
      token,
      password,
    });
  },
  googleLogin({ credential }: { credential: string }) {
    return apiRequest<LoginResponse>(API_ENDPOINT.DOCTOR.AUTH.GOOGLE_LOGIN, HTTP_METHOD.POST, {
      credential,
    });
  },
};
