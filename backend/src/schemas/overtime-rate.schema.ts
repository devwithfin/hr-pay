import { z } from "zod";

export const bodySchema = z.object({
  rate_type: z.string({ message: "Rate Type is required" }),
  multiplier: z.string({ message: "Multiplier is required" }),
  description: z.string({ message: "Description is required" }),
}).strict();

