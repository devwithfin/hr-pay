import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { AllowanceAttributes } from "../interfaces/allowance.interface";
import { EmployeeAllowance } from "./employee-allowance.model"; 

interface AllowanceCreationAttributes extends Optional<
  AllowanceAttributes, "allowance_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class Allowance
  extends Model<AllowanceAttributes, AllowanceCreationAttributes>
  implements AllowanceAttributes
{
  declare allowance_id: AllowanceAttributes["allowance_id"];
  declare allowance_name: AllowanceAttributes["allowance_name"];
  declare is_fixed: AllowanceAttributes["is_fixed"];
  declare default_amount: AllowanceAttributes["default_amount"];
  declare readonly createdAt: AllowanceAttributes["createdAt"];
  declare readonly updatedAt: AllowanceAttributes["updatedAt"];
  declare readonly deletedAt: AllowanceAttributes["deletedAt"];

  declare employee_allowance?: EmployeeAllowance[];
  
  static associate(models: any) {
    Allowance.hasMany(models.EmployeeAllowance, {
      foreignKey: "allowance_id",
      as : "employee_allowance"
    });
  }
}

export default function (sequelize: Sequelize) {
  Allowance.init(
    {
      allowance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      allowance_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      is_fixed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      default_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
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
      modelName: "Allowance",
      tableName: "allowances",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return Allowance;
}
