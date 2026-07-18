import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { PositionAttributes } from "../interfaces/position.interface";
import { Department } from "./department.model";

interface PositionCreationAttributes extends Optional<
  PositionAttributes,
  "position_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class Position
  extends Model<PositionAttributes, PositionCreationAttributes>
  implements PositionAttributes
{
  declare position_id: PositionAttributes["position_id"];
  declare department_id: PositionAttributes["department_id"];
  declare position_name: PositionAttributes["position_name"];
  declare base_salary: PositionAttributes["base_salary"];
  declare job_allowance: PositionAttributes["job_allowance"];
  declare readonly createdAt: PositionAttributes["createdAt"];
  declare readonly updatedAt: PositionAttributes["updatedAt"];
  declare readonly deletedAt: PositionAttributes["deletedAt"];

  declare department?: Department;

  static associate(models: any) {
    Position.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department",
    });
  }
}

export default function (sequelize: Sequelize) {
  Position.init(
    {
      position_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      base_salary: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      job_allowance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      modelName: "Position",
      tableName: "positions",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return Position;
}
