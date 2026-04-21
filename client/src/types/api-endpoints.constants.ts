export const API_ENDPOINT = {
  AUTH: {
    ME: "/auth/get-me",
    LOGOUT: "/auth/logout",
  },
  ADMIN: {
    AUTH: {
      LOGIN: "/admin/auth/login",
    },
    DOCTOR: {
      GET_ALL: "/admin/doctor/",
      GET: (id: string) => `/admin/doctor/${id}`,
      TOGGLE: (id: string) => `/admin/doctor/${id}/status`,
      APPROVAL: (id: string) => `/admin/doctor/${id}/approval-status`,
    },
  },
  DOCTOR: {
    AUTH: {
      REGISTER: "/doctor/auth/register",
      VERIFY_OTP: "/doctor/auth/verify-otp",
      RESEND_OTP: "/doctor/auth/resend-otp",
      LOGIN: "/doctor/auth/login",
      FORGET_PASSWORD: "/doctor/auth/forget-password",
      RESET_PASSWORD: "/doctor/auth/reset-password",
      GOOGLE_LOGIN: "/doctor/auth/google",
    },
    PROFILE: {
      COMPLETE: "/doctor/profile/complete-profile",
      BASE: "/doctor/profile",
      FEE: "/doctor/profile/fee",
    },
    SCHEDULE: {
      BASE: "/doctor/schedule",
      ID : (id : string)=>'/doctor/schedule/'+id
    },
  },
  PATIENT: {
    PROFILE: {
      I: "/patient/profile/",
    },
  },
} as const;
