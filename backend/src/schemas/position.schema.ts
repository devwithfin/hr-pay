import { z } from "zod";

export const bodySchema = z.object({
  position_name: z.string({ message: "Position Name is required" }),
  base_salary: z.string({ message: "Base Salary is required" }),
  department_id: z.string({ message: "Department ID is required" }),
  job_allowance: z.string({ message: "Job Allowance is required" }),
}).strict();

