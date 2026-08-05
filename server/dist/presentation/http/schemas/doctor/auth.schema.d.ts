import z from "zod";
export declare const doctorRegisterSchema: z.ZodObject<{
    full_name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    specialization: z.ZodString;
    career_start_year: z.z.ZodCoercedNumber<unknown>;
    gender: z.ZodEnum<{
        Male: "Male";
        Female: "Female";
        Other: "Other";
    }>;
}, z.z.core.$strip>;
export declare const doctorVerifyOTPSchema: z.ZodObject<{
    id: z.ZodString;
    otp: z.ZodString;
}, z.z.core.$strip>;
export declare const doctorResendOTPSchema: z.ZodObject<{
    id: z.ZodString;
}, z.z.core.$strip>;
export declare const doctorLoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const doctorForgetPasswordSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.z.core.$strip>;
export declare const doctorResetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map