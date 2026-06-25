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
      ID: (id: string) => "/doctor/schedule/" + id,
    },
    SLOT: {
      BASE: "/doctor/slot",
      BLOCK: {
        BASE: "/doctor/slot/block",
        ID: (id: string) => `/doctor/slot/block/${id}`,
      },
    },
    CHAT: {
      BASE: "/doctor/chat",
      ID: (id: string) => `/doctor/chat/${id}`,
    },
  },
  PATIENT: {
    PROFILE: {
      I: "/patient/profile/",
    },
    DOCTOR: {
      BASE: "/patient/doctors/",
      ID: (id: string) => `/patient/doctors/${id}`,
    },
    APPOINTMENT: {
      BASE: `/patient/appointment`,
      ID: {
        BASE: (id: string) => `/patient/appointment/${id}`,
        CHECKOUT: (id: string) => `/patient/appointment/${id}/checkout`,
        VERIFY: (id: string) => `/patient/appointment/${id}/verify`,
      },
    },
    LAB: {
      BASE: `/patient/lab`,
      UPLOAD: (id: string) => `/patient/lab/${id}/upload`,
    },
    CHAT: {
      BASE: "/patient/chat",
      ID: (id: string) => `/patient/chat/${id}`,
    },
  },
} as const;
