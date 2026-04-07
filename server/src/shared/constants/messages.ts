export enum MESSAGE {
  //common
  INVALID_REQUEST = 'Invalid Request',
  INTERNAL_ERROR = 'Internal Error',
  EMAIL_ALREADY_EXISTS = "Email Already exists",

  // middleware errors
  NOT_AUTHENTICATED = "User is not AUTHENTICATED",
  NOT_AUTHORIZED = "User not AUTHORIZED",

  //auth
  OTP_SENT = "OTP sent successfully",
  REGISTRATION_SUCCESSFUL = "Registration Successful, OTP Sent",
  OTP_VERIFIED = "OTP Verified Successfully",
  RESEND_SUCCESSFUL = "OTP Resend Successfully",
  LOGIN_SUCCESSFUL = "LOGIN Succesful",


  // doctor repo errors
  FAILED_FETCH_DOCTOR_BY_EMAIL = "Failed to fetch doctor by email",
  FAILED_FETCH_DOCTOR_BY_ID = "Failed to fetch doctor by ID",
  FAILED_SAVE_DOCTOR = "Failed to save doctor",
  DOCTOR_NOT_FOUND = "Doctor Not Found",

  // patient repo errors
  PATIENT_NOT_FOUND = 'Patient Not Found',


  // patient
  PATIENT_PROFILE_SUCCESS = "Patient Profile Got Succesffully",

  // admin patient
  PATIENT_FETCH_SUCCESS = "Patients Fetched Successfully",
  PATIENT_TOGGLE_BLOCK_SUCCESS = "Patient Block status Toggled Successfully",

  //admin doctor
  DOCTOR_FETCH_SUCCESS = "Doctor Fetched Successfully",
}
