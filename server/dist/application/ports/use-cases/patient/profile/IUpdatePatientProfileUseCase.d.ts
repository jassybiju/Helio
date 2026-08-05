export interface IUpdatePatientInput {
    patientId: string;
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    bloodGroup: string;
    phone: string;
}
export interface IUpdatePatientProfileUseCase {
    execute(input: IUpdatePatientInput): Promise<void>;
}
//# sourceMappingURL=IUpdatePatientProfileUseCase.d.ts.map