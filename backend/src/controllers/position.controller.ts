import { NextFunction, Request, Response } from "express";

import {
  getAllPositionsService,
  getByIdPositionService,
  createPositionService,
  updatePositionService,
  destroyPositionService,
} from "../services/position.service";

export const getAllPositions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query as any;

  const safeLimit = Math.min(limit, 50);

  const skip = (page - 1) * safeLimit;

  try {
    const { positions, totalData } = await getAllPositionsService(
      skip,
      safeLimit,
    );

    if (!positions.length) {
      return res.status(200).json({
        message: "No Position data found",
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
      message: "Position fetched successfully",
      data: positions,
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

export const getByIdPosition = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { position_id } = req.params as { position_id: string };

    const position = await getByIdPositionService(+position_id);

    return res.status(200).json({
      message: "Position fetched successfully",
      data: position,
    });
  } catch (err) {
    next(err);
  }
};

export const createPosition = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { position_name, base_salary, department_id, job_allowance } =
      req.body;

    const newPosition = await createPositionService({
      position_name,
      base_salary,
      department_id,
      job_allowance,
    });

    return res.status(200).json({
      message: "Position created successfully",
      data: newPosition,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePosition = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { position_id } = req.params as { position_id: string };

    const { position_name, base_salary, department_id, job_allowance } =
      req.body;

    const position = await updatePositionService(+position_id, {
      position_name,
      base_salary,
      department_id,
      job_allowance,
    });

    res.status(200).json({
      message: "Position updated successfully",
      data: position,
    });
  } catch (err) {
    next(err);
  }
};

export const destroyPosition = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { position_id } = req.params as { position_id: string };

    await destroyPositionService(+position_id);

    res.status(200).json({
      message: "Position deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
