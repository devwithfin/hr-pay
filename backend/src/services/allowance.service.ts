import { Op } from "sequelize";
import { AppError } from "../errors/app-error";
import db from "../models";
const { Allowance } = db;
import { AllowanceDTO } from "../interfaces/allowance.interface";

export const getAllAllowancesService = async (
  skip: number,
  limit: number,
) => {
  const { rows, count } = await Allowance.findAndCountAll({
    offset: skip,
    limit: limit,
    order: [["allowance_id", "DESC"]],
  });
  return {
    allowances: rows,
    totalData: count,
  };
};

export const getByIdAllowanceService = async (allowance_id: number) => {
  const allowance = await Allowance.findByPk(allowance_id, {});

  if (!allowance) {
    throw new AppError(404, "Allowance not found");
  }

  return allowance;
};

export const createAllowanceService = async (body: AllowanceDTO) => {
  const { allowance_name } = body;
  const existingAllowance = await Allowance.findOne({
    where: { allowance_name },
  });

  if (existingAllowance) {
    throw new AppError(400, "Allowance Name already exists");
  }
  const newAllowance = await Allowance.create(body);

  return newAllowance;
};

export const updateAllowanceService = async (
  allowance_id: number,
  body: Partial<AllowanceDTO>,
) => {
  const { allowance_name } = body;
  const existingAllowance = await Allowance.findOne({
    where: {
      allowance_name,
      allowance_id: { [Op.ne]: allowance_id },
    },
    paranoid: false,
  });

  if (existingAllowance) {
    throw new AppError(400, "Allowance Name already exists");
  }

  const allowance = await Allowance.findByPk(allowance_id);

  if (!allowance) {
    throw new AppError(404, "Allowance not found");
  }
  await allowance.update(body);

  return allowance;
};

export const destroyAllowanceService = async (allowance_id: number) => {
  const allowance = await Allowance.findByPk(allowance_id);

  if (!allowance) {
    throw new AppError(404, "Allowance not found");
  }

  await allowance.destroy();

  return allowance;
};
