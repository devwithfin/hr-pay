import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { PayrollPeriodAttributes } from "../interfaces/payroll-period.interface";

interface PayrollPeriodCreationAttributes extends Optional<
  PayrollPeriodAttributes,
  "period_id"
> {}

export class PayrollPeriod
  extends Model<PayrollPeriodAttributes, PayrollPeriodCreationAttributes>
  implements PayrollPeriodAttributes
{
  declare period_id: PayrollPeriodAttributes["period_id"];
  declare period_name: PayrollPeriodAttributes["period_name"];
  declare start_date: PayrollPeriodAttributes["start_date"];
  declare end_date: PayrollPeriodAttributes["end_date"];
  declare payroll_date: PayrollPeriodAttributes["payroll_date"];
  declare status: PayrollPeriodAttributes["status"];

  static associate(models: any) {}
}

export default function (sequelize: Sequelize) {
  PayrollPeriod.init(
    {
      period_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      period_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      payroll_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Open", "Closed"),
        allowNull: false,
        defaultValue: "Open",
      },
    },
    {
      sequelize,
      modelName: "PayrollPeriod",
      tableName: "payroll_periods",
      timestamps: false,
    },
  );

  return PayrollPeriod;
}
