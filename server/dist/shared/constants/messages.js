export var MESSAGE;
(function (MESSAGE) {
    //common
    MESSAGE["INVALID_REQUEST"] = "Invalid Request";
    MESSAGE["INTERNAL_ERROR"] = "Internal Error";
    MESSAGE["EMAIL_ALREADY_EXISTS"] = "Email Already exists";
    MESSAGE["USER_BLOCKED"] = "User Blocked. Contact supper";
    // middleware errors
    MESSAGE["NOT_AUTHENTICATED"] = "User is not AUTHENTICATED";
    MESSAGE["NOT_AUTHORIZED"] = "User not AUTHORIZED";
    //auth
    MESSAGE["OTP_SENT"] = "OTP sent successfully";
    MESSAGE["REGISTRATION_SUCCESSFUL"] = "Registration Successful, OTP Sent";
    MESSAGE["OTP_VERIFIED"] = "OTP Verified Successfully";
    MESSAGE["RESEND_SUCCESSFUL"] = "OTP Resend Successfully";
    MESSAGE["LOGIN_SUCCESSFUL"] = "LOGIN Succesful";
    MESSAGE["FORGET_PASSWORD_SEND"] = "If an account with this email exists, we\u2019ve sent a password reset link.";
    MESSAGE["PASSWORD_CHANGED_SUCCESFULY"] = "Password CHanged succesffuly";
    // doctor repo errors
    MESSAGE["FAILED_FETCH_DOCTOR_BY_EMAIL"] = "Failed to fetch doctor by email";
    MESSAGE["FAILED_FETCH_DOCTOR_BY_ID"] = "Failed to fetch doctor by ID";
    MESSAGE["FAILED_SAVE_DOCTOR"] = "Failed to save doctor";
    MESSAGE["DOCTOR_NOT_FOUND"] = "Doctor Not Found";
    // patient repo errors
    MESSAGE["PATIENT_NOT_FOUND"] = "Patient Not Found";
    // patient
    MESSAGE["PATIENT_PROFILE_SUCCESS"] = "Patient Profile Got Succesffully";
    MESSAGE["PATIENT_ADD_ALLERGEN_SUCCESS"] = "Patient Allergen Added Successfully";
    MESSAGE["PATIENT_REMOVE_ALLERGEN_SUCCESS"] = "Patient Allergen Removed Successfully";
    MESSAGE["PATIENT_ADD_CONDITION_SUCCESS"] = "Patient Condition Added Succesffuly";
    MESSAGE["PATIENT_REMOVE_CONDITION_SUCCESS"] = "Patient Condition Removed Succesffuly";
    //doctor
    MESSAGE["DOCTOR_PROFILE_SUCCESS"] = "Doctor Profile Got Succesffully";
    MESSAGE["DOCTOR_FEE_UPDATED"] = "Doctor Fee Updated Successfully";
    MESSAGE["DOCTOR_SCHEDULE_CREATED"] = "Doctor Scheduled created successfully";
    MESSAGE["DOCTOR_SCHEDULE_SUCCESS"] = "Doctor Scheduled Got successfully";
    MESSAGE["DOCTOR_SCHEDULE_DELETED"] = "Doctor Schedule deleted  Succesffuly";
    //schedule
    MESSAGE["DOC_SCHEDULE_NOT_FOUND"] = "Doctor Schedule Not found";
    MESSAGE["DOC_SCHEDULE_MIS_MATCH"] = "Schedule doesnt belong to this Doctor";
    MESSAGE["DOCTOR_SHEDULE_OVERLAP_ERROR"] = "Doctor Schedule Overlaps existing schedules";
    MESSAGE["DOC_SLOT_GET"] = "Doctor Slots Get Success";
    // admin patient
    MESSAGE["PATIENT_FETCH_SUCCESS"] = "Patients Fetched Successfully";
    MESSAGE["PATIENT_TOGGLE_BLOCK_SUCCESS"] = "Patient Block status Toggled Successfully";
    //admin doctor
    MESSAGE["DOCTOR_FETCH_SUCCESS"] = "Doctor Fetched Successfully";
    //<===============  ERROR ==============>
    // appointemnt
    MESSAGE["APPOINTMENT_NOT_FOUND"] = "Appointment Not Found";
    MESSAGE["APPOINTMENT_NOT_ACCESS"] = "Unauthrized Appointment Access";
    MESSAGE["APPOINTMENT_ALREADY_PAID"] = "Appointment ALready paid";
    // consultation
    MESSAGE["CONSULTATION_NOT_FOUND"] = "Consultation Not Found";
    MESSAGE["CONSULTATION_NOT_ACCESS"] = "Unauthrized Consultation Access";
    // block
    MESSAGE["BLOCK_NOT_FOUND"] = "Doctor Block not found";
    // chat session
    MESSAGE["CHAT_SESSION_NOT_FOUND"] = "CHat session not found";
    MESSAGE["CHAT_SESSION_NOT_ACCESS"] = "CAN'T Access Caht";
    MESSAGE["USER_NOT_FOUND"] = "User not found";
    //wallet
    MESSAGE["WALLET_NOT_FOUND"] = "WALLET NOT FOUND";
})(MESSAGE || (MESSAGE = {}));
//# sourceMappingURL=messages.js.map