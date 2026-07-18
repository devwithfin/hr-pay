import { Op } from "sequelize";
import { AppError } from "../errors/app-error";
import db from "../models";
const { Deduction } = db;
import { DeductionDTO } from "../interfaces/deduction.interface";

export const getAllDeductionsService = async (skip: number, limit: number) => {
  const { rows, count } = await Deduction.findAndCountAll({
    offset: skip,
    limit: limit,
    order: [["deduction_id", "DESC"]],
  });
  return {
    deductions: rows,
    totalData: count,
  };
};

export const getByIdDeductionService = async (deduction_id: number) => {
  const deduction = await Deduction.findByPk(deduction_id, {
  });

  if (!deduction) {
    throw new AppError(404, "Deduction not found");
  }

  return deduction;
};

export const createDeductionService = async (body: DeductionDTO) => {
    const { deduction_name } = body;

  const existingDeduction = await Deduction.findOne({
    where: { deduction_name },
  });

  if (existingDeduction) {
    throw new AppError(400, "Deduction Name already exists");
  }
  const newDeduction = await Deduction.create();

  return newDeduction;
};

export const updateDeductionService = async (
  deduction_id: number,
  body: Partial<DeductionDTO>
) => {
      const { deduction_name } = body;

  const existingDeduction = await Deduction.findOne({
    where: {
      deduction_name,
      deduction_id: { [Op.ne]: deduction_id },
    },
    paranoid: false,
  });

  if (existingDeduction) {
    throw new AppError(400, "Deduction Name already exists");
  }

  const deduction = await Deduction.findByPk(deduction_id);

  if (!deduction) {
    throw new AppError(404, "Deduction not found");
  }
  await deduction.update(body);

  return deduction;
};

export const destroyDeductionService = async (deduction_id: number) => {
  const deduction = await Deduction.findByPk(deduction_id);

  if (!deduction) {
    throw new AppError(404, "Deduction not found");
  }

  await deduction.destroy();

  return deduction;
};
