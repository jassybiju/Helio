export enum MESSAGE {
  //auth
  OTP_SENT = "OTP sent successfully",
  REGISTRATION_SUCCESSFUL = "Registration Successful, OTP Sent",
  OTP_VERIFIED = "OTP Verified Successfully",
  RESEND_SUCCESSFUL = "OTP Resend Successfully",
  LOGIN_SUCCESSFUL = "LOGIN Succesful",

  EMAIL_ALREADY_EXISTS = "Email Already exists",

  // doctor repo errors
  FAILED_FETCH_DOCTOR_BY_EMAIL = "Failed to fetch doctor by email",
  FAILED_FETCH_DOCTOR_BY_ID = "Failed to fetch doctor by ID",
  FAILED_SAVE_DOCTOR = "Failed to save doctor",
  DOCTOR_NOT_FOUND = "Doctor Not Found",
}
