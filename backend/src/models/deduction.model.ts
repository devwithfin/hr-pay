import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { DeductionAttributes } from "../interfaces/deduction.interface";
import { EmployeeDeduction } from "./employee-deduction.model"; 

interface DeductionCreationAttributes extends Optional<DeductionAttributes, 'deduction_id' | "createdAt" | "updatedAt" | "deletedAt"> {}

export class Deduction extends Model<DeductionAttributes, DeductionCreationAttributes> implements DeductionAttributes {

  declare deduction_id: DeductionAttributes["deduction_id"];
  declare deduction_name: DeductionAttributes["deduction_name"];
  declare readonly createdAt: DeductionAttributes["createdAt"];
  declare readonly updatedAt: DeductionAttributes["updatedAt"];
  declare readonly deletedAt: DeductionAttributes["deletedAt"];

  declare employee_deduction?: EmployeeDeduction[];
  
   static associate(models:any) {
      Deduction.hasMany(models.EmployeeDeduction, {
        foreignKey: "deduction_id",
        as: "employee_deduction"
      });
    }
}

export default function (sequelize: Sequelize) {
  Deduction.init(
    {
      deduction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      deduction_name: {
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
      modelName: "Deduction",
      tableName: "deductions",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return Deduction;
};
