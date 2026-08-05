export interface IBlockDoctorInput {
    startTime: Date;
    endTime: Date;
    reason: string;
    force?: boolean | undefined;
}
export interface IBlockDoctorSlotUseCase {
    execute(doctorId: string, input: IBlockDoctorInput): Promise<{
        blocked: false;
        reason: string;
        blockDetails: unknown;
        appointments: unknown;
    } | {
        blocked: true;
    }>;
}
//# sourceMappingURL=IBlockDoctorSlotUseCase.d.ts.map