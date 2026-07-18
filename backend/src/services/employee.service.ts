import { AppError } from "../errors/app-error";
import db from "../models";
const { Employee, User, Department, Position } = db;
import bcrypt from "bcrypt";

import { EmployeeDTO } from "../interfaces/employee.interface";

export const getAllEmployeesService = async (skip: number, limit: number) => {
  const { rows, count } = await Employee.findAndCountAll({
    attributes: {
      exclude: ["deletedAt"],
    },
    include: [
      { model: Department, as: "department", attributes: ["department_name"] },
      {
        model: Position,
        as: "position",
        attributes: ["position_name", "job_allowance"],
      },
    ],
    offset: skip,
    limit: limit,
    order: [["employee_id", "DESC"]],
  });

  const formattedRows = rows.map((emp: any) => {
    const plain = emp.toJSON();
    return {
      ...plain,
      department_name: plain.department?.department_name || undefined,
      position_name: plain.position?.position_name || undefined,
      job_allowance: plain.position?.job_allowance || 0,
      department: undefined,
      position: undefined,
    };
  });

  return {
    employees: formattedRows,
    totalData: count,
  };
};

export const getByIdEmployeeService = async (employee_id: number) => {
  const emp = await Employee.findByPk(employee_id, {
    attributes: {
      exclude: ["deletedAt"],
    },
    include: [
      { model: Department, as: "department", attributes: ["department_name"] },
      {
        model: Position,
        as: "position",
        attributes: ["position_name", "job_allowance"],
      },
    ],
  });

  if (!emp) {
    throw new AppError(404, "Employee not found");
  }

  const plain = emp.toJSON();
  return {
    ...plain,
    department_name: plain.department?.department_name || undefined,
    position_name: plain.position?.position_name || undefined,
    job_allowance: plain.position?.job_allowance || 0,
    department: undefined,
    position: undefined,
  };
};

export const createEmployeeService = async (body: EmployeeDTO) => {
  return await db.sequelize.transaction(async (t: any) => {
    const existingEmployee = await Employee.findOne({
      where: { email: body.email },
      transaction: t,
    });
    if (existingEmployee) {
      throw new AppError(400, "Email already registered for an employee");
    }

    const newEmployee = await Employee.create(body, { transaction: t });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    await User.create(
      {
        employee_id: newEmployee.employee_id,
        email: newEmployee.email,
        role: (body as any).role || "Employee",
        password: hashedPassword,
      },
      { transaction: t },
    );

    return newEmployee;
  });
};

export const updateEmployeeService = async (
  employee_id: number,
  body: Partial<EmployeeDTO>,
) => {
  const employee = await Employee.findByPk(employee_id);

  if (!employee) {
    throw new AppError(404, "Employee not found");
  }

  await employee.update(body);

  return employee;
};

export const deleteEmployeeService = async (employee_id: number) => {
  const employee = await Employee.findByPk(employee_id);

  if (!employee) {
    throw new AppError(404, "Employee not found");
  }
  await employee.destroy();
};
