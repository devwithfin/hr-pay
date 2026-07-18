import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { OvertimeRateAttributes } from "../interfaces/overtime-rate.interface";

interface OvertimeRateCreationAttributes extends Optional<
  OvertimeRateAttributes,
  "rate_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class OvertimeRate
  extends Model<OvertimeRateAttributes, OvertimeRateCreationAttributes>
  implements OvertimeRateAttributes
{
  declare rate_id: OvertimeRateAttributes["rate_id"];
  declare rate_type: OvertimeRateAttributes["rate_type"];
  declare multiplier: OvertimeRateAttributes["multiplier"];
  declare description: OvertimeRateAttributes["description"];
  declare readonly createdAt: OvertimeRateAttributes["createdAt"];
  declare readonly updatedAt: OvertimeRateAttributes["updatedAt"];
  declare readonly deletedAt: OvertimeRateAttributes["deletedAt"];

  static associate(models: any) {}
}

export default function (sequelize: Sequelize) {
  OvertimeRate.init(
    {
      rate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rate_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      multiplier: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: "OvertimeRate",
      tableName: "overtime_rates",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return OvertimeRate;
}
