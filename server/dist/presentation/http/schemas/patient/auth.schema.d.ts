import z from "zod";
export declare const patientRegisterSchema: z.ZodObject<{
    first_name: z.ZodString;
    last_name: z.ZodString;
    email: z.ZodEmail;
    phone: z.ZodString;
    password: z.ZodString;
    gender: z.ZodEnum<{
        Male: "Male";
        Female: "Female";
        Other: "Other";
    }>;
    dob: z.ZodString;
}, z.z.core.$strip>;
export declare const patientVerifyOTPSchema: z.ZodObject<{
    id: z.ZodString;
    otp: z.ZodString;
}, z.z.core.$strip>;
export declare const patientResendOTPSchema: z.ZodObject<{
    id: z.ZodString;
}, z.z.core.$strip>;
export declare const patientLoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const patientForgetPasswordSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.z.core.$strip>;
export declare const patientResetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
//# sourceMappingURL=auth.schema.d.ts.map