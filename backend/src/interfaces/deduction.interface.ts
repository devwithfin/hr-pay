export interface DeductionAttributes {
  deduction_id: number;
  deduction_name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type DeductionDTO = Omit<DeductionAttributes, "deduction_id" | "createdAt" | "updatedAt" | "deletedAt">;