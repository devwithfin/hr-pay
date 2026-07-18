export interface OvertimeRateAttributes {
  rate_id: number ;
  rate_type: string ;
  multiplier: number ;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type OvertimeRateDTO = Omit<
  OvertimeRateAttributes,
  "rate_id" | "createdAt" | "updatedAt" | "deletedAt"
>;
