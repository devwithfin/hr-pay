import { z } from "zod";

export const bodySchema = z.object({
  department_name: z.string({ message: "Department Name is required" }),
}).strict();

