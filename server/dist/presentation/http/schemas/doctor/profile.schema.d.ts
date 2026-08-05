import z from "zod";
export declare const doctorCompleteProfileSchema: z.ZodObject<{
    specialization: z.ZodString;
    career_start_year: z.z.ZodCoercedNumber<unknown>;
    gender: z.ZodEnum<{
        Male: "Male";
        Female: "Female";
        Other: "Other";
    }>;
}, z.z.core.$strip>;
export declare const doctorUpdateFeeSchema: z.ZodObject<{
    onlineFee: z.ZodNumber;
    clinicFee: z.ZodNumber;
}, z.z.core.$strip>;
export declare const doctorUpdateProfileSchema: z.ZodObject<{
    specialization: z.ZodString;
    fullName: z.ZodString;
    bio: z.ZodString;
}, z.z.core.$strip>;
//# sourceMappingURL=profile.schema.d.ts.map