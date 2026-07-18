import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { EmployeeAllowanceAttributes } from "../interfaces/employee-allowance.interface";
import { Employee } from "./employee.model"; 
import { Allowance } from "./allowance.model"; 

interface EmployeeAllowanceAttributesCreationAttributes extends Optional<
  EmployeeAllowanceAttributes,
  "emp_allowance_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class EmployeeAllowance
  extends Model<
    EmployeeAllowanceAttributes,
    EmployeeAllowanceAttributesCreationAttributes
  >
  implements EmployeeAllowanceAttributes
{
  declare emp_allowance_id: EmployeeAllowanceAttributes["emp_allowance_id"];
  declare employee_id: EmployeeAllowanceAttributes["employee_id"];
  declare allowance_id: EmployeeAllowanceAttributes["allowance_id"];
  declare amount: EmployeeAllowanceAttributes["amount"];
  declare effective_date: EmployeeAllowanceAttributes["effective_date"];
  declare end_date: EmployeeAllowanceAttributes["end_date"];
  declare readonly createdAt: EmployeeAllowanceAttributes["createdAt"];
  declare readonly updatedAt: EmployeeAllowanceAttributes["updatedAt"];
  declare readonly deletedAt: EmployeeAllowanceAttributes["deletedAt"];

  declare employees?: Employee;

  declare allowances?: Allowance;

  static associate(models: any) {
    EmployeeAllowance.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as: "employee",
    });

    EmployeeAllowance.belongsTo(models.Allowance, {
      foreignKey: "allowance_id",
      as: "allowance",
    });
  }
}

export default function (sequelize: Sequelize) {
  EmployeeAllowance.init(
    {
      emp_allowance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      allowance_id: {
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
      modelName: "EmployeeAllowance",
      tableName: "employee_allowances",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return EmployeeAllowance;
}
