export type IVerifyOtpRequestDTO = {
  id: string;
  otp: string;
  context: "patient" | "doctor";
};

export type IVerifyOTPResponseDTO = {
  is_verified: boolean;
};

export type IResendOTPRequestDTO = {
  id: string;
};

export type IResendOTPResponseDTO = {
  id: string;
  otp_sent: boolean;
  invalidAt: string;
};
