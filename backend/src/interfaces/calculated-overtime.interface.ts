export interface CalculatedOvertimeAttributes {
  calculated_id: number;
  request_id: number;
  employee_id: number;
  overtime_date: Date;
  start_time: string;
  end_time: string;
  duration_minutes: string;
  overtime_amount: number;
  calculation_details: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type CalculatedOvertimeDTO = Omit<CalculatedOvertimeAttributes, "calculated_id" | "createdAt" | "updatedAt" | "deletedAt">;