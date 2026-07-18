import { Op } from "sequelize";
import { AppError } from "../errors/app-error";
import db from "../models";
const { OvertimeRate } = db;
import { OvertimeRateDTO } from "../interfaces/overtime-rate.interface";

export const getAllOvertimeRatesService = async (
  skip: number,
  limit: number,
) => {
  const { rows, count } = await OvertimeRate.findAndCountAll({
    offset: skip,
    limit: limit,
    order: [["rate_id", "DESC"]],
  });
  return {
    overtimeRates: rows,
    totalData: count,
  };
};

export const getByIdOvertimeRateService = async (rate_id: number) => {
  const overtimeRate = await OvertimeRate.findByPk(rate_id, {});

  if (!overtimeRate) {
    throw new AppError(404, "Overtime Rate not found");
  }

  return overtimeRate;
};

export const createOvertimeRateService = async (body: OvertimeRateDTO) => {
  const { rate_type } = body;
  const existingOvertimeRate = await OvertimeRate.findOne({
    where: { rate_type },
  });

  if (existingOvertimeRate) {
    throw new AppError(400, "Overtime Rate Type already exists");
  }
  const newOvertimeRate = await OvertimeRate.create(body);

  return newOvertimeRate;
};

export const updateOvertimeRateService = async (
  rate_id: number,
  body: Partial<OvertimeRateDTO>,
) => {
  const { rate_type } = body;
  const existingOvertimeRate = await OvertimeRate.findOne({
    where: {
      rate_type,
      rate_id: { [Op.ne]: rate_id },
    },
    paranoid: false,
  });

  if (existingOvertimeRate) {
    throw new AppError(400, "Overtime Rate Type already exists");
  }

  const overtimeRate = await OvertimeRate.findByPk(rate_id);

  if (!overtimeRate) {
    throw new AppError(404, "Overtime Rate not found");
  }
  await overtimeRate.update(body);

  return overtimeRate;
};

export const destroyOvertimeRateService = async (rate_id: number) => {
  const overtimeRate = await OvertimeRate.findByPk(rate_id);

  if (!overtimeRate) {
    throw new AppError(404, "Overtime Rate not found");
  }

  await overtimeRate.destroy();

  return overtimeRate;
};
