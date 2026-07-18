import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { DepartmentAttributes } from "../interfaces/department.interface";
import { Employee } from "./employee.model"; 

interface DepartmentCreationAttributes
  extends Optional<DepartmentAttributes, "department_id" | "createdAt" | "updatedAt" | "deletedAt"> {}

export class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  declare department_id: number;
  declare department_name: DepartmentAttributes['department_name'];
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date | null;

  declare employee?: Employee[];

  static associate(models: any) {
    Department.hasMany(models.Employee, {
      foreignKey: "department_id",
      as: "employee",
    });
  }
}

export default function (sequelize: Sequelize) {
  Department.init(
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
      modelName: "Department",
      tableName: "departments",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return Department;
}