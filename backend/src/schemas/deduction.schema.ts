import { z } from "zod";

export const bodySchema = z.object({
  deduction_name: z.string({ message: "Deduction Name is required" }),
}).strict();

