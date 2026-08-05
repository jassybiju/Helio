import { DoctorShift } from "#domain/entities/DoctorShift.js";
export declare class DoctorShiftMapper {
    static toDomain(raw: {
        _id: string;
        doctor_id: string;
        day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
        start_time: string;
        end_time: string;
        consultation_type: "ONLINE" | "CLINIC";
        slot_interval_in_minutes: number;
        capacity_per_slot: number;
        created_at: Date;
        location?: string | null;
        is_deleted: boolean;
    }): DoctorShift;
    static toPersistance(t: DoctorShift): {
        _id: string;
        doctor_id: string;
        day_of_week: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
        start_time: string;
        end_time: string;
        consultation_type: "ONLINE" | "CLINIC";
        slot_interval_in_minutes: number;
        capacity_per_slot: number;
        created_at: NativeDate;
        location?: string | null;
        is_deleted: boolean;
    };
}
//# sourceMappingURL=DoctorShiftMapper.d.ts.map