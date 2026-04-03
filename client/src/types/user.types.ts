export type USER_DATA = {
    id: string;
  email: string;
  role: USER_ROLES;
  status?: string;
  isProfileComplete : boolean
}

export type USER_ROLES = 'doctor' | 'patient' | 'admin'