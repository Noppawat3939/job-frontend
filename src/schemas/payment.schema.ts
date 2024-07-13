import { z } from "zod";
import { paymentSlipImageSchema, refNumberSchema } from "./schemas";

export const createTransactionSchema = z.object({
  refNumber: refNumberSchema.create,
  slipImage: paymentSlipImageSchema.create,
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
