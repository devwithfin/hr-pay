import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { PayrollDetailAttributes } from "../interfaces/payroll-detail.interface";
import { Employee } from "./employee.model";
import { PayrollPeriod } from "./payroll-period.model";

interface PayrollDetailAttributesCreationAttributes extends Optional<
  PayrollDetailAttributes,
  "payroll_detail_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class PayrollDetail
  extends Model<
    PayrollDetailAttributes,
    PayrollDetailAttributesCreationAttributes
  >
  implements PayrollDetailAttributes
{
  declare payroll_detail_id: PayrollDetailAttributes["payroll_detail_id"];
  declare period_id: PayrollDetailAttributes["period_id"];
  declare employee_id: PayrollDetailAttributes["employee_id"];
  declare total_working_days: PayrollDetailAttributes["total_working_days"];
  declare total_attendance_days: PayrollDetailAttributes["total_attendance_days"];
  declare base_salary: PayrollDetailAttributes["base_salary"];
  declare total_allowances: PayrollDetailAttributes["total_allowances"];
  declare total_overtime_pay: PayrollDetailAttributes["total_overtime_pay"];
  declare gross_salary: PayrollDetailAttributes["gross_salary"];
  declare pph21_deduction: PayrollDetailAttributes["pph21_deduction"];
  declare bpjs_kesehatan_deduction: PayrollDetailAttributes["bpjs_kesehatan_deduction"];
  declare bpjs_ketenagakerjaan_deduction: PayrollDetailAttributes["bpjs_ketenagakerjaan_deduction"];
  declare other_deductions: PayrollDetailAttributes["other_deductions"];
  declare total_deductions: PayrollDetailAttributes["total_deductions"];
  declare net_salary: PayrollDetailAttributes["net_salary"];
  declare payroll_status: PayrollDetailAttributes["payroll_status"];
  declare is_paid: PayrollDetailAttributes["is_paid"];
  declare payment_date: PayrollDetailAttributes["payment_date"];
  declare readonly createdAt: PayrollDetailAttributes["createdAt"];
  declare readonly updatedAt: PayrollDetailAttributes["updatedAt"];
  declare readonly deletedAt: PayrollDetailAttributes["deletedAt"];

  declare employee?: Employee;

  declare period?: PayrollPeriod;

  static associate(models: any) {
    PayrollDetail.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as: "employee",
    });
    PayrollDetail.belongsTo(models.PayrollPeriod, {
      foreignKey: "period_id",
      as: "period",
    });
  }
}

export default function (sequelize: Sequelize) {
  PayrollDetail.init(
    {
      payroll_detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      period_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_working_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_attendance_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      base_salary: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      total_allowances: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      total_overtime_pay: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      gross_salary: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      pph21_deduction: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      bpjs_kesehatan_deduction: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      bpjs_ketenagakerjaan_deduction: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      other_deductions: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      total_deductions: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      net_salary: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      payroll_status: {
        type: DataTypes.ENUM("Draft", "Final"),
        allowNull: false,
        defaultValue: "Draft",
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
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
      modelName: "PayrollDetail",
      tableName: "payroll_details",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return PayrollDetail;
}
