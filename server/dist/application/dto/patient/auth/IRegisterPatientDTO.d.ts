export type IRegisterPatientRequestDTO = {
    email: string;
    phone: string;
    password: string;
    first_name: string;
    last_name: string;
    gender: string;
    dob: string;
};
export type IRegisterPatientResponseDTO = {
    id: string;
    email: string;
    otp_invalid_at: string;
};
//# sourceMappingURL=IRegisterPatientDTO.d.ts.map