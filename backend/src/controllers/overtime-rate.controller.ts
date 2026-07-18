import { NextFunction, Request, Response } from "express";

import {
  getAllOvertimeRatesService,
  getByIdOvertimeRateService,
  createOvertimeRateService,
  updateOvertimeRateService,
  destroyOvertimeRateService,
} from "../services/overtime-rate.service";

export const getAllOvertimeRates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query as any;

  const safeLimit = Math.min(limit, 50);

  const skip = (page - 1) * safeLimit;

  try {
    const { overtimeRates, totalData } = await getAllOvertimeRatesService(
      skip,
      safeLimit,
    );

    if (!overtimeRates.length) {
      return res.status(200).json({
        message: "No Overtime Rate data found",
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
      message: "Overtime Rate fetched successfully",
      data: overtimeRates,
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

export const getByIdOvertimeRate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { rate_id } = req.params as { rate_id: string };

    const overtimeRate = await getByIdOvertimeRateService(+rate_id);

    return res.status(200).json({
      message: "Overtime Rate fetched successfully",
      data: overtimeRate,
    });
  } catch (err) {
    next(err);
  }
};

export const createOvertimeRate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { rate_type, multiplier, description } = req.body;

    const newOvertimeRate = await createOvertimeRateService({
      rate_type,
      multiplier,
      description,
    });

    return res.status(200).json({
      message: "Overtime Rate created successfully",
      data: newOvertimeRate,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOvertimeRate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { rate_id } = req.params as { rate_id: string };

    const { rate_type, multiplier, description } = req.body;

    const position = await updateOvertimeRateService(+rate_id, {
      rate_type,
      multiplier,
      description,
    });

    res.status(200).json({
      message: "Overtime Rate updated successfully",
      data: position,
    });
  } catch (err) {
    next(err);
  }
};

export const destroyOvertimeRate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { rate_id } = req.params as { rate_id: string };

    await destroyOvertimeRateService(+rate_id);

    res.status(200).json({
      message: "Overtime Rate deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
