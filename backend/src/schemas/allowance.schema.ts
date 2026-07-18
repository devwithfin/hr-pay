import { z } from "zod";

export const bodySchema = z.object({
  allowance_name: z.string({ message: "Allowance Name is required" }),
  is_fixed: z.string({ message: "Option Fixed is required" }),
  default_amount: z.string({ message: "Default Amount is required" }),
}).strict();

