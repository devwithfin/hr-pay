export interface EmployeeAttributes {
  employee_id: number;
  id_user?: number | null;
  position_id: number;
  department_id: number;
  role: "HR" | "Finance" | "Employee";
  employee_nik: string;
  full_name: string;
  dob: string;
  gender: "W" | "M";
  address: string;
  phone_number: string;
  email: string;
  employment_status?:
    | "Permanent"
    | "Contract"
    | "Probation"
    | "Outsourced"
    | "Intern"
    | "Resigned";
  join_date: Date;
  resignation_date?: Date | null;
  npwp_number: number;
  pt_kp: "TK0" | "TK1" | "TK2" | "TK3" | "K0" | "K1" | "K2" | "K3";
  bank_account_number: number;
  bank_name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type EmployeeDTO = Omit<
  EmployeeAttributes,
  "employee_id" | "createdAt" | "updatedAt" | "deletedAt"
>;
