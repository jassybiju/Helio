export class GetDoctorScheduleMapper {
    static toDto(shifts) {
        return shifts.map((shift) => ({
            id: shift.shiftId,
            doctorId: shift.doctorId,
            dayOfWeek: shift.dayOfWeek,
            startTime: shift.startTime.toString(),
            endTime: shift.endTime.toString(),
            consultationType: shift.consultationType,
            location: shift.location,
            slotIntervalInMinutes: shift.slotIntervalInMinutes,
            capacityPerSlot: shift.capacityPerSlot,
            createdAt: shift.createdAt.toLocaleDateString(),
        }));
    }
}
//# sourceMappingURL=GetDoctorScheduleMapper.js.map