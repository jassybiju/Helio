export class GetDoctorBlockSlotMapper {
    static toDto(blockShift) {
        return blockShift.map((bs) => ({
            id: bs.id,
            startDate: bs.startTime.toISOString(),
            endDate: bs.endTime.toISOString(),
            reason: bs.reason ?? null,
        }));
    }
}
//# sourceMappingURL=GetDoctorBlockSlotMapper.js.map