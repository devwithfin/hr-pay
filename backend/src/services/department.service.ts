import { Op } from "sequelize";
import { AppError } from "../errors/app-error";
import db from "../models";
const { Department } = db;
import { DepartmentDTO } from "../interfaces/department.interface";

export const getAllDepartmentsService = async (skip: number, limit: number) => {
  const { rows, count } = await Department.findAndCountAll({
    offset: skip,
    limit: limit,
    order: [["department_id", "DESC"]],
  });
  return {
    departments: rows,
    totalData: count,
  };
};

export const getByIdDepartmentService = async (department_id: number) => {
  const department = await Department.findByPk(department_id, {});

  if (!department) {
    throw new AppError(404, "Department not found");
  }

  return department;
};

export const createDepartmentService = async (body: DepartmentDTO) => {
  const { department_name } = body;

  const existingDepartment = await Department.findOne({
    where: { department_name },
  });

  if (existingDepartment) {
    throw new AppError(400, "Department Name already exists");
  }
  const newDepartment = await Department.create(body);

  return newDepartment;
};

export const updateDepartmentService = async (
  department_id: number,
  body: Partial<DepartmentDTO>,
) => {
  const { department_name } = body;

  const existingDepartment = await Department.findOne({
    where: {
      department_name,
      department_id: { [Op.ne]: department_id },
    },
    paranoid: false,
  });

  if (existingDepartment) {
    throw new AppError(400, "Department Name already exists");
  }

  const department = await Department.findByPk(department_id);

  if (!department) {
    throw new AppError(404, "Department not found");
  }
  await department.update(body);

  return department;
};

export const destroyDepartmentService = async (department_id: number) => {
  const department = await Department.findByPk(department_id);

  if (!department) {
    throw new AppError(404, "Department not found");
  }

  await department.destroy();

  return department;
};
