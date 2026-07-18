export interface EmployeeDeductionAttributes {
  emp_deduction_id: number;
  employee_id: number;
  deduction_id: number;
  amount: number;
  effective_date: Date;
  end_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type EmployeeDeductionDTO = Omit<
  EmployeeDeductionAttributes,
  "emp_deduction_id" | "createdAt" | "updatedAt" | "deletedAt"
>;
