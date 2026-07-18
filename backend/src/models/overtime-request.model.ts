import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { OvertimeRequestAttributes } from "../interfaces/overtime-request.interface";
import { Employee } from "./employee.model";
import { CalculatedOvertime } from "./calculated-overtime.model";

interface OvertimeRequestCreationAttributes extends Optional<
  OvertimeRequestAttributes,
  "request_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class OvertimeRequest
  extends Model<OvertimeRequestAttributes, OvertimeRequestCreationAttributes>
  implements OvertimeRequestAttributes
{
  declare request_id: OvertimeRequestAttributes["request_id"];
  declare employee_id: OvertimeRequestAttributes["employee_id"];
  declare request_date: OvertimeRequestAttributes["request_date"];
  declare overtime_date: OvertimeRequestAttributes["overtime_date"];
  declare start_time: OvertimeRequestAttributes["start_time"];
  declare end_time: OvertimeRequestAttributes["end_time"];
  declare reason: OvertimeRequestAttributes["reason"];
  declare submitted_by: OvertimeRequestAttributes["submitted_by"];
  declare approval_status: OvertimeRequestAttributes["approval_status"];
  declare approved_by_hrd: OvertimeRequestAttributes["approved_by_hrd"];
  declare approval_date_hrd: OvertimeRequestAttributes["approval_date_hrd"];
  declare notes_approval: OvertimeRequestAttributes["notes_approval"];
  declare readonly createdAt: OvertimeRequestAttributes["createdAt"];
  declare readonly updatedAt: OvertimeRequestAttributes["updatedAt"];
  declare readonly deletedAt: OvertimeRequestAttributes["deletedAt"];

  declare employee?: Employee;
  declare submitter?: Employee;
  declare hrdApprover?: Employee;
  declare calculation?: CalculatedOvertime;

  static associate(models: any) {
    OvertimeRequest.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as: "employee",
    });

    OvertimeRequest.belongsTo(models.Employee, {
      foreignKey: "submitted_by",
      as: "submitter",
    });

    OvertimeRequest.belongsTo(models.Employee, {
      foreignKey: "approved_by_hrd",
      as: "hrdApprover",
    });

    OvertimeRequest.hasOne(models.CalculatedOvertime, {
      foreignKey: "request_id",
      as: "calculation",
    });
  }
}

export default function (sequelize: Sequelize) {
  OvertimeRequest.init(
    {
      request_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      request_date: {
        type: DataTypes.DATE,
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
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      submitted_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      approval_status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        allowNull: false,
        defaultValue: "Pending",
      },
      approved_by_hrd: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      approval_date_hrd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      notes_approval: {
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
      modelName: "OvertimeRequest",
      tableName: "overtime_requests",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return OvertimeRequest;
}
