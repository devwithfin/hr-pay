import { NextFunction, Request, Response } from "express";

import {
  getAllDeductionsService,
  getByIdDeductionService,
  createDeductionService,
  updateDeductionService,
  destroyDeductionService,
} from "../services/deduction.service";

export const getAllDeductions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query as any;

  const safeLimit = Math.min(limit, 50);

  const skip = (page - 1) * safeLimit;

  try {
    const { deductions, totalData } = await getAllDeductionsService(
      skip,
      safeLimit,
    );

    if (!deductions.length) {
      return res.status(200).json({
        message: "No Deduction data found",
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
      message: "Deduction fetched successfully",
      data: deductions,
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

export const getByIdDeduction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { deduction_id } = req.params as { deduction_id: string };

    const deduction = await getByIdDeductionService(+deduction_id);

    return res.status(200).json({
      message: "Deduction fetched successfully",
      data: deduction,
    });
  } catch (err) {
    next(err);
  }
};

export const createDeduction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { deduction_name } = req.body;
    const newDeduction = await createDeductionService(deduction_name);

    return res.status(200).json({
      message: "Deduction created successfully",
      data: newDeduction,
    });
  } catch (err) {
    next(err);
  }
};

export const updateDeduction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { deduction_id } = req.params as { deduction_id: string };

    const { deduction_name } = req.body;
    const deduction = await updateDeductionService(
      +deduction_id,
      deduction_name,
    );

    res.status(200).json({
      message: "Deduction updated successfully",
      data: deduction,
    });
  } catch (err) {
    next(err);
  }
};

export const destroyDeduction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { deduction_id } = req.params as { deduction_id: string };

    await destroyDeductionService(+deduction_id);

    res.status(200).json({
      message: "Deduction deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
