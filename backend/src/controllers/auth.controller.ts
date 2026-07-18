import { NextFunction, Request, Response } from "express";
import {loginService} from  "../services/auth.service"; 
import { AppError } from "../errors/app-error";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(400, "Email and password are required");
    }

    const result = await loginService(req.body);
    
    return res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};