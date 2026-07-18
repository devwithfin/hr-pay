import { NextFunction, Request, Response } from "express";
import {
  getProfileService,
  getAllUsersService,
  updatePasswordService,
} from "../services/user.service";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getProfileService(req.user!.id_user);

    return res.status(200).json({
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query as any; 
  
  const safeLimit = Math.min(limit, 50); 

  const skip = (page - 1) * safeLimit;
  try {
    const {users, totalData} = await getAllUsersService(skip,safeLimit);

    if (!users.length) {
      return res.status(200).json({ 
          message: "No account data found", 
          data: [],
          meta: {
          current_page: page,
          limit: safeLimit,
          total_data: 0,
          total_pages: 0
        }
         });
    }

    const totalPages = Math.ceil(totalData / safeLimit);

    res.status(200).json({
      message: "Accounts fetched successfully",
      data: users,
      meta: {
        current_page: page,
        limit: safeLimit,
        total_data: totalData,
        total_pages: totalPages
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id_user } = req.params as { id_user: string };
    const { password } = req.body;

    await updatePasswordService(+id_user, password);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};
