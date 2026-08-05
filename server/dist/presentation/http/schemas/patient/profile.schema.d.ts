import { BLOOD_GROUP } from "#domain/common/enums/blood-group.enum.js";
import z from "zod";
export declare const patientCompleteProfileSchema: z.ZodObject<{
    gender: z.ZodEnum<{
        male: "male";
        female: "female";
        other: "other";
    }>;
    dob: z.ZodString;
    phone: z.ZodString;
}, z.z.core.$strip>;
export declare const updatePatientSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    gender: z.ZodEnum<{
        male: "male";
        female: "female";
        other: "other";
    }>;
    dob: z.ZodString;
    bloodGroup: z.ZodEnum<typeof BLOOD_GROUP>;
    phone: z.ZodString;
}, z.z.core.$strip>;
//# sourceMappingURL=profile.schema.d.ts.map