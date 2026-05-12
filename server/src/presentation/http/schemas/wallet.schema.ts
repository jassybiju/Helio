import { TRANSACTION_TYPE } from "@domain/common/enums/wallet.enum.ts";
import z from "zod";

export const getWalletSchema = z.object({
  type: z.enum(TRANSACTION_TYPE).optional(),
  fromDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  toDate: z
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
  order: z.enum(["asc", "desc"]).optional(),
});

export const addMoneySchema = z.object({
  amount: z.number().min(0),
});
