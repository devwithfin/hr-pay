import { z } from "zod";

export const bodySchema = z.object({
  id_user: z.number().nullable().optional(),
  resignation_date: z.string().nullable().optional(), 
  position_id: z.number({ message: "Position ID is required" }),
  department_id: z.number({ message: "Department ID is required" }),
  role: z.enum(["HR", "Finance", "Employee"], { message: "Role must be either HR, Finance, or Employee" }),
  employee_nik: z.string({ message: "Employee NIK is required" }),
  full_name: z.string({ message: "Full Name is required" }),
  dob: z.string({ message: "Date of Birth is required" }), 
  gender: z.enum(["W", "M"], { message: "Gender must be either W or M" }),
  address: z.string({ message: "Address is required" }),
  phone_number: z.string({ message: "Phone Number is required" }),
  email: z.string({ message: "Email is required" }).email({ message: "Invalid email format" }),
  employment_status: z.enum(
    ["Permanent", "Contract", "Probation", "Outsourced", "Intern", "Resigned"],
    { message: "Invalid Employment Status" }
  ),
  join_date: z.string({ message: "Join Date is required" }), 
  npwp_number: z.string({ message: "NPWP Number is required" }),
  pt_kp: z.enum(["TK0", "TK1", "TK2", "TK3", "K0", "K1", "K2", "K3"], { message: "Invalid PTKP status" }),
  bank_account_number: z.string({ message: "Bank Account Number is required" }),
  bank_name: z.string({ message: "Bank Name is required" }),
}).strict();