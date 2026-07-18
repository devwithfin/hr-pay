import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { EmployeeDeductionAttributes } from "../interfaces/employee-deduction.interface";
import { Employee } from "./employee.model"; 
import { Deduction } from "./deduction.model"; 

interface EmployeeDeductionAttributesCreationAttributes extends Optional<
  EmployeeDeductionAttributes,
  "emp_deduction_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class EmployeeDeduction
  extends Model<
    EmployeeDeductionAttributes,
    EmployeeDeductionAttributesCreationAttributes
  >
  implements EmployeeDeductionAttributes
{
  declare emp_deduction_id: EmployeeDeductionAttributes["emp_deduction_id"];
  declare employee_id: EmployeeDeductionAttributes["employee_id"];
  declare deduction_id: EmployeeDeductionAttributes["deduction_id"];
  declare amount: EmployeeDeductionAttributes["amount"];
  declare effective_date: EmployeeDeductionAttributes["effective_date"];
  declare end_date: EmployeeDeductionAttributes["end_date"];
  declare readonly createdAt: EmployeeDeductionAttributes["createdAt"];
  declare readonly updatedAt: EmployeeDeductionAttributes["updatedAt"];
  declare readonly deletedAt: EmployeeDeductionAttributes["deletedAt"];

    declare employee?: Employee[];
  
    declare deduction?: Deduction[];

  static associate(models: any) {
    EmployeeDeduction.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as: "employee"
    });
    EmployeeDeduction.belongsTo(models.Deduction, {
      foreignKey: "deduction_id",
      as: "deduction"
    });
  }
}

export default function (sequelize: Sequelize) {
  EmployeeDeduction.init(
    {
      emp_deduction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deduction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      effective_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
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
      modelName: "EmployeeDeduction",
      tableName: "employee_deductions",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return EmployeeDeduction;
}
