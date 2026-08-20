export type USER_DATA = {
  id: string;
  email: string;
  role: USER_ROLES;
  status?: DOCTOR_STATUS;
  isProfileComplete: boolean;
  profilePic?: string;
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

export enum BLOOD_GROUP {
  A_NEG = "A-",
  B_NEG = "B-",
  AB_NEG = "AB-",
  O_NEG = "O-",
  O_POS = "O+",
  A_POS = "A+",
  B_POS = "B+",
  AB_POS = "AB+",
}
