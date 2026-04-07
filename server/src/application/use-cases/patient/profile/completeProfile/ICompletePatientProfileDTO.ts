export type ICompletePatientProfileRequestDTO = {
  gender: string;
  phone: string;
  dob: string;
};

export type ICompletePatientProfileResponseDTO = {
  isProfileComplete: boolean;
};
