export interface AllowanceAttributes {
  allowance_id: number;
  allowance_name: string;
  is_fixed: Boolean;
  default_amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type AllowanceDTO = Omit<AllowanceAttributes, "allowance_id" | "createdAt" | "updatedAt" | "deletedAt">;