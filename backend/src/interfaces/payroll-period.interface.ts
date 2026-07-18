export interface PayrollPeriodAttributes {
  period_id: number;
  period_name: string;
  start_date: Date;
  end_date: Date;
  payroll_date: Date;
  status: "Open" | "Closed";
}

export type PayrollPeriodDTO = Omit<
  PayrollPeriodAttributes,
  "period_id"
>;
