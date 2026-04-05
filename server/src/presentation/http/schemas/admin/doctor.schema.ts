import { DOCTOR_VERIFICATION_STATUS } from "@domain/common/enums/doctor.enum.ts";
import z from "zod";

export const getAllDoctorSchema = z.object({
  search: z.string().optional(),
  isBlocked: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : val === "true")),
  isVerified: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? undefined : val === "true")),
  createdFrom: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  createdTo: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10)),
  sortBy: z.enum(["createdAt", "firstName"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});


export const changeDoctorApprovalStatusSchema = z.object({
  verification_status: z.enum(DOCTOR_VERIFICATION_STATUS),
  rejection_reason: z.string().min(1).nullable(),
}).refine(
  (data) => {
    if (data.verification_status === DOCTOR_VERIFICATION_STATUS.REJECTED) {
      return !!data.rejection_reason;
    }
    return true;
},
  {
    message: "Rejection reason is required when rejecting",
    path: ["rejection_reason"],
  }
);