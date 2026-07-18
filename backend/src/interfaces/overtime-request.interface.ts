export interface OvertimeRequestAttributes {
  request_id: number;
  employee_id: number;
  request_date: Date;
  overtime_date: Date;
  start_time: string;
  end_time: string;
  reason: string;
  submitted_by: number;
  approval_status: "Pending" | "Approved" | "Rejected";
  approved_by_hrd: number;
  approval_date_hrd: Date;
  notes_approval?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type OvertimeRequestDTO = Omit<
  OvertimeRequestAttributes,
  "request_id" | "createdAt" | "updatedAt" | "deletedAt"
>;
