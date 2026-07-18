import { z } from "zod";

export const emptyStrictSchema = z.object({}).strict();

export const paginationQuerySchema = z.object({
  page: z
    .string({ message: "Page parameter is required" })
    .regex(/^\d+$/)
    .transform(Number),
  limit: z
    .string({ message: "Limit parameter is required" })
    .regex(/^\d+$/)
    .transform(Number),
});