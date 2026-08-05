import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
import z from "zod";
export declare const doctorViewAllAppointmentSchema: z.ZodObject<{
    query: z.ZodObject<{
        search: z.ZodOptional<z.ZodString>;
        date: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<Date | undefined, string | undefined>>;
        page: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
        limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
        status: z.ZodOptional<z.ZodEnum<typeof APPOINTMENT_STATUS>>;
        type: z.ZodOptional<z.ZodEnum<typeof CONSULTATION_TYPE>>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=appointment.schema.d.ts.map