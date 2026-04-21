import type {
  CONSULTATION_TYPE,
  SLOT_STATUS,
} from "@domain/common/enums/doctorShift.enum.ts";

export class DoctorSlot {
  constructor(
    private readonly _id: string,
    private readonly _shiftId: string,
    private readonly _doctorId: string,
    private readonly _appointmentId: string | null,

    private readonly _startTime: Date,
    private readonly _endTime: Date,

    private readonly _consultationType: CONSULTATION_TYPE,
    private readonly status: SLOT_STATUS,

    private readonly _createdAt: Date
  ) {}
}
