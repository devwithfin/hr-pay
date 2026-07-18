import { NextFunction, Request, Response } from "express";

import {
  getAllAllowancesService,
  getByIdAllowanceService,
  createAllowanceService,
  updateAllowanceService,
  destroyAllowanceService,
} from "../services/allowance.service";

export const getAllAllowances = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query as any;

  const safeLimit = Math.min(limit, 50);

  const skip = (page - 1) * safeLimit;

  try {
     const { allowances, totalData } = await getAllAllowancesService(
          skip,
          safeLimit,
        );

    if (!allowances.length) {
      return res.status(200).json({
        message: "No Allowance data found",
        data: [],
        meta: {
          current_page: page,
          limit: safeLimit,
          total_data: 0,
          total_pages: 0,
        },
      });
    }

    const totalPages = Math.ceil(totalData / safeLimit);

    res.status(200).json({
      message: "Allowance fetched successfully",
      data: allowances,
      meta: {
        current_page: page,
        limit: safeLimit,
        total_data: totalData,
        total_pages: totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getByIdAllowance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { allowance_id } = req.params as { allowance_id: string };

    const allowance = await getByIdAllowanceService(+allowance_id);

    return res.status(200).json({
      message: "Allowance fetched successfully",
      data: allowance,
    });
  } catch (err) {
    next(err);
  }
};

export const createAllowance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { allowance_name, is_fixed, default_amount } =
      req.body;

    const newAllowance = await createAllowanceService({
       allowance_name, is_fixed, default_amount
    });

    return res.status(200).json({
      message: "Allowance created successfully",
      data: newAllowance,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAllowance= async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { allowance_id } = req.params as { allowance_id: string };

    const { allowance_name, is_fixed, default_amount } =
      req.body;

    const allowance = await updateAllowanceService(+allowance_id, {
       allowance_name, is_fixed, default_amount
    });

    res.status(200).json({
      message: "Allowance updated successfully",
      data: allowance,
    });
  } catch (err) {
    next(err);
  }
};

export const destroyAllowance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { allowance_id } = req.params as { allowance_id: string };

    await destroyAllowanceService(+allowance_id);

    res.status(200).json({
      message: "Allowance deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
