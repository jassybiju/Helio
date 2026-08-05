import { Appointment } from "#domain/entities/Appointment.js";
import type { AppointmentRaw } from "#infrastructure/database/model/AppointmentModel.js";
export declare class AppointmentMapper {
    static toDomain(raw: AppointmentRaw): Appointment;
    static toPersistence(domain: Appointment): AppointmentRaw;
}
//# sourceMappingURL=AppointmentMapper.d.ts.map