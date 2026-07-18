export interface EmployeeAllowanceAttributes {
  emp_allowance_id: number;
  employee_id: number;
  allowance_id: number;
  amount: number;
  effective_date: Date;
  end_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type EmployeeAllowanceDTO = Omit<
  EmployeeAllowanceAttributes,
  "emp_allowance_id" | "createdAt" | "updatedAt" | "deletedAt"
>;
