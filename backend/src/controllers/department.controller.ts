import { NextFunction, Request, Response } from "express";

import {
  getAllDepartmentsService,
  getByIdDepartmentService,
  createDepartmentService,
  updateDepartmentService,
  destroyDepartmentService,
} from "../services/department.service";

export const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query as any;

  const safeLimit = Math.min(limit, 50);

  const skip = (page - 1) * safeLimit;

  try {
    const { departments, totalData } = await getAllDepartmentsService(
      skip,
      safeLimit,
    );

    if (!departments.length) {
      return res.status(200).json({
        message: "No Department data found",
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
      message: "Department fetched successfully",
      data: departments,
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

export const getByIdDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { department_id } = req.params as { department_id: string };

    const department = await getByIdDepartmentService(+department_id);

    return res.status(200).json({
      message: "Department fetched successfully",
      data: department,
    });
  } catch (err) {
    next(err);
  }
};

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { department_name } = req.body;
    const newDepartment = await createDepartmentService(department_name);

    return res.status(200).json({
      message: "Department created successfully",
      data: newDepartment,
    });
  } catch (err) {
    next(err);
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { department_id } = req.params as { department_id: string };

    const { department_name } = req.body;
    const department = await updateDepartmentService(
      +department_id,
      department_name,
    );

    res.status(200).json({
      message: "Department updated successfully",
      data: department,
    });
  } catch (err) {
    next(err);
  }
};

export const destroyDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { department_id } = req.params as { department_id: string };

    await destroyDepartmentService(+department_id);

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
