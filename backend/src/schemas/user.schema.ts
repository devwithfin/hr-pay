import { z } from "zod";

export const updatePasswordSchema = z.object({
  password: z.string({ message: "Password is required" }),
}).strict();

