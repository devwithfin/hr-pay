import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { CalculatedOvertimeAttributes } from "../interfaces/calculated-overtime.interface";
import { Employee } from "./employee.model"; 
import { OvertimeRequest } from "./overtime-request.model"; 

interface CalculatedOvertimeCreationAttributes extends Optional<
  CalculatedOvertimeAttributes,
  "calculated_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class CalculatedOvertime
  extends Model<
    CalculatedOvertimeAttributes,
    CalculatedOvertimeCreationAttributes
  >
  implements CalculatedOvertimeAttributes
{
  declare calculated_id: CalculatedOvertimeAttributes["calculated_id"];
  declare request_id: CalculatedOvertimeAttributes["request_id"];
  declare employee_id: CalculatedOvertimeAttributes["employee_id"];
  declare overtime_date: CalculatedOvertimeAttributes["overtime_date"];
  declare start_time: CalculatedOvertimeAttributes["start_time"];
  declare end_time: CalculatedOvertimeAttributes["end_time"];
  declare duration_minutes: CalculatedOvertimeAttributes["duration_minutes"];
  declare overtime_amount: CalculatedOvertimeAttributes["overtime_amount"];
  declare calculation_details: CalculatedOvertimeAttributes["calculation_details"];
  declare readonly createdAt: CalculatedOvertimeAttributes["createdAt"];
  declare readonly updatedAt: CalculatedOvertimeAttributes["updatedAt"];
  declare readonly deletedAt: CalculatedOvertimeAttributes["deletedAt"];

  declare employee?: Employee;
  
  declare overtime_request?: OvertimeRequest;
     
  static associate(models: any) {
    CalculatedOvertime.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as : "employee"
    });
    CalculatedOvertime.belongsTo(models.OvertimeRequest, {
      foreignKey: "request_id",
      as: "overtime_request",
    });
  }
}

export default function (sequelize: Sequelize) {
  CalculatedOvertime.init(
    {
      calculated_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      overtime_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      overtime_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      calculation_details: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      modelName: "CalculatedOvertime",
      tableName: "calculated_overtimes",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return CalculatedOvertime;
}
