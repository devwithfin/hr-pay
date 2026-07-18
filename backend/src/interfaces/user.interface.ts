export interface UserAttributes {
  id_user: number;
  employee_id: number | null;
  email: string;
  role: "HR" | "Finance" | "Employee" | null;
  password: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDTO = Omit<
  UserAttributes,
  "id_user" | "createdAt" | "updatedAt"
>;
