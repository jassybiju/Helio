export enum MESSAGE {
  //common
  INVALID_REQUEST = "Invalid Request",
  INTERNAL_ERROR = "Internal Error",
  EMAIL_ALREADY_EXISTS = "Email Already exists",
  USER_BLOCKED = "User Blocked. Contact supper",

  // middleware errors
  NOT_AUTHENTICATED = "User is not AUTHENTICATED",
  NOT_AUTHORIZED = "User not AUTHORIZED",

  //auth
  OTP_SENT = "OTP sent successfully",
  REGISTRATION_SUCCESSFUL = "Registration Successful, OTP Sent",
  OTP_VERIFIED = "OTP Verified Successfully",
  RESEND_SUCCESSFUL = "OTP Resend Successfully",
  LOGIN_SUCCESSFUL = "LOGIN Succesful",
  FORGET_PASSWORD_SEND = "If an account with this email exists, we’ve sent a password reset link.",
  PASSWORD_CHANGED_SUCCESFULY = "Password CHanged succesffuly",

  // doctor repo errors
  FAILED_FETCH_DOCTOR_BY_EMAIL = "Failed to fetch doctor by email",
  FAILED_FETCH_DOCTOR_BY_ID = "Failed to fetch doctor by ID",
  FAILED_SAVE_DOCTOR = "Failed to save doctor",
  DOCTOR_NOT_FOUND = "Doctor Not Found",

  // patient repo errors
  PATIENT_NOT_FOUND = "Patient Not Found",

  // patient
  PATIENT_PROFILE_SUCCESS = "Patient Profile Got Succesffully",
  PATIENT_ADD_ALLERGEN_SUCCESS = "Patient Allergen Added Successfully",
  PATIENT_REMOVE_ALLERGEN_SUCCESS = "Patient Allergen Removed Successfully",
  PATIENT_ADD_CONDITION_SUCCESS = "Patient Condition Added Succesffuly",
  PATIENT_REMOVE_CONDITION_SUCCESS = "Patient Condition Removed Succesffuly",

  //doctor
  DOCTOR_PROFILE_SUCCESS = "Doctor Profile Got Succesffully",
  DOCTOR_FEE_UPDATED = "Doctor Fee Updated Successfully",
  DOCTOR_SCHEDULE_CREATED = "Doctor Scheduled created successfully",
  DOCTOR_SCHEDULE_SUCCESS = "Doctor Scheduled Got successfully",
  DOCTOR_SCHEDULE_DELETED = "Doctor Schedule deleted  Succesffuly",

  //schedule
  DOC_SCHEDULE_NOT_FOUND = "Doctor Schedule Not found",
  DOC_SCHEDULE_MIS_MATCH = "Schedule doesnt belong to this Doctor",
  DOCTOR_SHEDULE_OVERLAP_ERROR = "Doctor Schedule Overlaps existing schedules",
  DOC_SLOT_GET = "Doctor Slots Get Success",

  // admin patient
  PATIENT_FETCH_SUCCESS = "Patients Fetched Successfully",
  PATIENT_TOGGLE_BLOCK_SUCCESS = "Patient Block status Toggled Successfully",

  //admin doctor
  DOCTOR_FETCH_SUCCESS = "Doctor Fetched Successfully",

  //<===============  ERROR ==============>

  // appointemnt
  APPOINTMENT_NOT_FOUND = "Appointment Not Found",
  APPOINTMENT_NOT_ACCESS = "Unauthrized Appointment Access",
  APPOINTMENT_ALREADY_PAID = "Appointment ALready paid",

  // consultation
  CONSULTATION_NOT_FOUND = "Consultation Not Found",
  CONSULTATION_NOT_ACCESS = "Unauthrized Consultation Access",

  // block
  BLOCK_NOT_FOUND = "Doctor Block not found",

  // chat session
  CHAT_SESSION_NOT_FOUND = "CHat session not found",
  CHAT_SESSION_NOT_ACCESS = "CAN'T Access Caht",
  USER_NOT_FOUND = "User not found",

  //wallet
  WALLET_NOT_FOUND = "WALLET NOT FOUND",
}
