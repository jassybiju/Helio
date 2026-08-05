export interface IChangePatientPasswordUseCase {
    execute(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}
//# sourceMappingURL=IChangePatientPasswordUseCase.d.ts.map