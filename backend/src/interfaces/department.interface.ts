export interface DepartmentAttributes {
  department_id: number;
  department_name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type DepartmentDTO = Omit<DepartmentAttributes, "department_id" | "createdAt" | "updatedAt" | "deletedAt">;