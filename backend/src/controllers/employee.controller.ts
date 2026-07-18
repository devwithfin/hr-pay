import { NextFunction, Request, Response } from "express";
import {
  getAllEmployeesService,
  getByIdEmployeeService,
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
} from "../services/employee.service";

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, limit } = req.query as any;

  const safeLimit = Math.min(Number(limit) || 10, 50);
  const safePage = Number(page) || 1;
  const skip = (safePage - 1) * safeLimit;

  try {
    const { employees, totalData } = await getAllEmployeesService(
      skip,
      safeLimit,
    );

    if (!employees.length) {
      return res.status(200).json({
        message: "No employee data found",
        data: [],
        meta: {
          current_page: safePage,
          limit: safeLimit,
          total_data: 0,
          total_pages: 0,
        },
      });
    }

    const totalPages = Math.ceil(totalData / safeLimit);

    res.status(200).json({
      message: "Employee fetched successfully",
      data: employees,
      meta: {
        current_page: safePage,
        limit: safeLimit,
        total_data: totalData,
        total_pages: totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getByIdEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { employee_id } = req.params as { employee_id: string };

    const employee = await getByIdEmployeeService(+employee_id);

    return res.status(200).json({
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employeeData = req.body;

    const newEmployee = await createEmployeeService(employeeData);

    return res.status(201).json({
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (err) {
    next(err);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { employee_id } = req.params as { employee_id: string };
    const updatedData = req.body;

    const updatedEmployee = await updateEmployeeService(+employee_id, updatedData);

    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (err) {
    next(err);
  }
};

export const destroyEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { employee_id } = req.params as { employee_id: string };

    await deleteEmployeeService(+employee_id);

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};