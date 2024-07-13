import { z } from "zod";
import { refNumberSchema } from "./schemas";

export const createTransactionSchema = z.object({
  refNumber: refNumberSchema.create,
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
