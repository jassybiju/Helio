import { BOOKING_PERIOD } from "#domain/common/enums/appointment.enum.js";
import z from "zod";
export declare const getDoctorDashboardSchema: z.ZodObject<{
    query: z.ZodObject<{
        period: z.ZodEnum<typeof BOOKING_PERIOD>;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
//# sourceMappingURL=dashboard.schema.d.ts.map