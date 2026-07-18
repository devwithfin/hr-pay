export interface PositionAttributes {
   position_id: number;
   department_id: number;
   position_name: string;
   base_salary: number;
   job_allowance?: number | null;
   createdAt?: Date;
   updatedAt?: Date;
   deletedAt?: Date | null;
}

export type PositionDTO = Omit<
  PositionAttributes,
 "position_id" | "createdAt" | "updatedAt" | "deletedAt"
>;
