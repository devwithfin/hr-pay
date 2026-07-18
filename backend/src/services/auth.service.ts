import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models";
import "dotenv/config";
import { AppError } from '../errors/app-error';

const { User, Employee } = db;

export const loginService = async ({ email, password }: { email: string; password: string }) => {
  
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Employee,
        as: "employee",
        attributes: ["full_name", "email"],
      },
    ],
  });

  if (!user) {
    throw new AppError(
      404,
      "User not found"
    );
  }

  if (!user.password) {
    throw new AppError(
      401,
      "Email or password is incorrect"
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(
      401,
      "Email or password is incorrect"
    );
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const payload = { id_user: user.id_user, role: user.role };
  const token = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });

  return {
    token,
    user: {
      id_user: user.id_user,
      email: user.email,
      role: user.role,
      full_name: user.employee?.full_name || null,
      employee_email: user.employee?.email || null,
    },
  };
};