import { AppError } from "../errors/app-error";
import db from "../models";
const { User, Employee, Position, Department } = db;
import bcrypt from "bcrypt";

export const getProfileService = async (id_user: number) => {
  const user = await User.findByPk(id_user,{
    attributes: ["id_user", "email", "role"],
    include: [
      {
        model: Employee,
        as: "employee",
        attributes: {
          exclude: [
            "id_user",
            "role",
            "resignation_date",
            "createdAt",
            "updatedAt",
            "deletedAt",
          ],
        },
        include: [
          {
            model: Position,
            as: "position"
          },
          {
            model: Department,
            as: "department",
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

export const getAllUsersService = async (skip: number, limit: number) => {
  const {rows, count} = await User.findAndCountAll({
    attributes: {
      exclude: ["employee_id", "password"]
    },
    offset: skip,
    limit: limit,
    order: [["id_user", "DESC"]],
  });
  return {
    users: rows, 
    totalData: count
  };
};

export const updatePasswordService = async (id_user:number, newPassword: string) => {
    const user = await User.findByPk(id_user)

    if (!user) {
    throw new AppError(404, "User not found");
  }

   const hashedPassword = await bcrypt.hash(newPassword, 10);

   await user.update({ password: hashedPassword });
}
