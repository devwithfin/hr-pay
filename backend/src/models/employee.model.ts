import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { EmployeeAttributes } from "../interfaces/employee.interface";
import { Position } from "./position.model"; 
import { Department } from "./department.model"; 
import { User } from "./user.model"; 
import { EmployeeAllowance } from "./employee-allowance.model"; 
import { OvertimeRequest } from "./overtime-request.model"; 

interface EmployeeCreationAttributes extends Optional<
  EmployeeAttributes,
  "employee_id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  declare employee_id: EmployeeAttributes["employee_id"];
  declare id_user: EmployeeAttributes["id_user"];
  declare position_id: EmployeeAttributes["position_id"];
  declare department_id: EmployeeAttributes["department_id"];
  declare role: EmployeeAttributes["role"];
  declare employee_nik: EmployeeAttributes["employee_nik"];
  declare full_name: EmployeeAttributes["full_name"];
  declare dob: EmployeeAttributes["dob"];
  declare gender: EmployeeAttributes["gender"];
  declare address: EmployeeAttributes["address"];
  declare phone_number: EmployeeAttributes["phone_number"];
  declare email: EmployeeAttributes["email"];
  declare employment_status:EmployeeAttributes["employment_status"];
  declare join_date: EmployeeAttributes["join_date"];
  declare resignation_date: EmployeeAttributes["resignation_date"];
  declare npwp_number: EmployeeAttributes["npwp_number"];
  declare pt_kp: EmployeeAttributes["pt_kp"];
  declare bank_account_number: EmployeeAttributes["bank_account_number"];
  declare bank_name: EmployeeAttributes["bank_name"];
  declare readonly createdAt: EmployeeAttributes["createdAt"];
  declare readonly updatedAt: EmployeeAttributes["updatedAt"];
  declare readonly deletedAt: EmployeeAttributes["deletedAt"];

  declare position?: Position;
  declare department?: Department;
  declare user?: User;

  declare employee_allowances?: EmployeeAllowance[]; 
  declare overtimeRequestsAsEmployee?: OvertimeRequest[];
  declare overtimeRequestsAsSubmitter?: OvertimeRequest[];
  declare overtimeRequestsAsHRDApprover?: OvertimeRequest[];

  static associate(models: any) {
    Employee.belongsTo(models.Position, {
      foreignKey: "position_id",
      as: "position",
    });

    Employee.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department",
    });

    Employee.hasOne(models.User, {
      foreignKey: "employee_id",
      as: "user",
    });

    Employee.hasMany(models.EmployeeAllowance, {
      foreignKey: "employee_id",
      as: "employee_allowances"
    });

    Employee.hasMany(models.OvertimeRequest, {
      foreignKey: "employee_id",
      as: "overtimeRequestsAsEmployee",
    });

    Employee.hasMany(models.OvertimeRequest, {
      foreignKey: "submitted_by",
      as: "overtimeRequestsAsSubmitter",
    });

    Employee.hasMany(models.OvertimeRequest, {
      foreignKey: "approved_by_hrd",
      as: "overtimeRequestsAsHRDApprover",
    });
  }
}

export default function (sequelize: Sequelize) {
  Employee.init(
    {
      employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
      position_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("HR", "Finance", "Employee"),
        allowNull: false,
      },
      employee_nik: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("W", "M"),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      employment_status: {
        type: DataTypes.ENUM(
          "Permanent",
          "Contract",
          "Probation",
          "Outsourced",
          "Intern",
          "Resigned",
        ),
        allowNull: false,
      },
      join_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      resignation_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      npwp_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      pt_kp: {
        type: DataTypes.ENUM(
          "TK0",
          "TK1",
          "TK2",
          "TK3",
          "K0",
          "K1",
          "K2",
          "K3",
        ),
        allowNull: false,
      },
      bank_account_number: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      bank_name: {
        type: DataTypes.STRING(50),
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
      modelName: "Employee",
      tableName: "employees",
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return Employee;
}
