export type USER_DATA = {
  id: string;
  email: string;
  role: USER_ROLES;
  status?: DOCTOR_STATUS;
  isProfileComplete: boolean;
};

export enum USER_ROLES {
  DOCTOR = "doctor",
  PATIENT = "patient",
  ADMIN = "admin",
}

export enum DOCTOR_STATUS {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
