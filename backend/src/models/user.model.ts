import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { UserAttributes } from "../interfaces/user.interface";
import { Employee } from "./employee.model";

interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id_user" | "createdAt" | "updatedAt"
> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id_user: UserAttributes["id_user"];
  declare employee_id: UserAttributes["employee_id"];
  declare email: UserAttributes["email"];
  declare role: UserAttributes["role"];
  declare password: UserAttributes["password"];
  declare readonly createdAt: UserAttributes["createdAt"];
  declare readonly updatedAt: UserAttributes["updatedAt"];

  declare employee?: Employee;

  static associate(models: any) {
    User.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as: "employee",
    });
  }
}

export default function (sequelize: Sequelize) {
  User.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("HR", "Finance", "Employee"),
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
    },
  );
  return User;
}
