export interface PayrollDetailAttributes {
  payroll_detail_id: number;
  period_id: number;
  employee_id: number;
  total_working_days: number;
  total_attendance_days: number;
  base_salary: number;
  total_allowances: number;
  total_overtime_pay: number;
  gross_salary: number;
  pph21_deduction: number;
  bpjs_kesehatan_deduction: number;
  bpjs_ketenagakerjaan_deduction: number;
  other_deductions: number;
  total_deductions: number;
  net_salary: number;
  payroll_status: "Draft" | "Final";
  is_paid: Boolean;
  payment_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type PayrollDetailDTO = Omit<
  PayrollDetailAttributes,
  "payroll_detail_id" | "createdAt" | "updatedAt" | "deletedAt"
>;
