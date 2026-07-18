import { Op } from "sequelize";
import { AppError } from "../errors/app-error";
import db from "../models";
const { Department, Position } = db;
import { PositionDTO } from "../interfaces/position.interface";

export const getAllPositionsService = async (skip: number, limit: number) => {
  const { rows, count } = await Position.findAndCountAll({
    attributes: {
      exclude: ["department_id"],
    },
    include: {
      model: Department,
      as: "department",
      attributes: ["department_id", "department_name"],
    },
    offset: skip,
    limit: limit,
    order: [["position_id", "DESC"]],
  });
  return {
    positions: rows,
    totalData: count,
  };
};

export const getByIdPositionService = async (position_id: number) => {
  const position = await Position.findByPk(position_id, {
    attributes: {
      exclude: ["department_id"],
    },
    include: {
      model: Department,
      as: "department",
      attributes: ["department_id", "department_name"],
    },
  });

  if (!position) {
    throw new AppError(404, "Position not found");
  }

  return position;
};

export const createPositionService = async (body: PositionDTO) => {
  const { position_name } = body;

  const existingPosition = await Position.findOne({
    where: { position_name },
  });

  if (existingPosition) {
    throw new AppError(400, "Position Name already exists");
  }

  const newPosition = await Position.create(body);

  return newPosition;
};

export const updatePositionService = async (
  position_id: number,
  body: Partial<PositionDTO>,
) => {
  const { position_name } = body;

  const existingPosition = await Position.findOne({
    where: {
      position_name,
      position_id: { [Op.ne]: position_id },
    },
    paranoid: false,
  });

  if (existingPosition) {
    throw new AppError(400, "Position Name already exists");
  }

  const position = await Position.findByPk(position_id);

  if (!position) {
    throw new AppError(404, "Position not found");
  }
  await position.update(body);

  return position;
};

export const destroyPositionService = async (position_id: number) => {
  const position = await Position.findByPk(position_id);

  if (!position) {
    throw new AppError(404, "Position not found");
  }

  await position.destroy();

  return position;
};
