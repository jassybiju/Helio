import { z } from "zod";
import { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
export declare const createPatientAppointmentSchema: z.ZodObject<{
    doctorId: z.ZodString;
    startTime: z.ZodCoercedDate<unknown>;
    consultationType: z.ZodEnum<typeof CONSULTATION_TYPE>;
}, z.core.$strip>;
export declare const checkoutSchema: z.ZodObject<{
    params: z.ZodObject<{
        appointmentId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        type: z.ZodEnum<{
            WALLET: "WALLET";
            RAZORPAY: "RAZORPAY";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const verifyPaymentSchema: z.ZodObject<{
    params: z.ZodObject<{
        appointmentId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        razorpay_payment_id: z.ZodString;
        razorpay_order_id: z.ZodString;
        razorpay_signature: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const rescheduleAppointmentSchema: z.ZodObject<{
    body: z.ZodObject<{
        startTime: z.ZodCoercedDate<unknown>;
        consultationType: z.ZodEnum<typeof CONSULTATION_TYPE>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=appointment.schema.d.ts.map