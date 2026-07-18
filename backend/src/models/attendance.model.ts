import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { AttendanceAttributes } from "../interfaces/attendance.interface";
import { Employee } from "./employee.model"; 

interface AttendanceCreationAttributes extends Optional<
  AttendanceAttributes,
  "attendance_id"
> {}

export class Attendance
  extends Model<AttendanceAttributes, AttendanceCreationAttributes>
  implements AttendanceAttributes
{
   declare attendance_id: AttendanceAttributes["attendance_id"];
   declare attendance_date: AttendanceAttributes["attendance_date"];
   declare check_in_time: AttendanceAttributes["check_in_time"];
   declare check_out_time?: AttendanceAttributes["check_out_time"];
   declare status?: AttendanceAttributes["status"];
   declare notes?: AttendanceAttributes["notes"];

   declare employee?: Employee;
   
  static associate(models: any) {
    Attendance.belongsTo(models.Employee, {
      foreignKey: "employee_id",
      as: "employee",
    });
  }
}

export default function (sequelize: Sequelize) {
  Attendance.init(
    {
      attendance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attendance_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      check_in_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      check_out_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Present", "Sick", "Leave", "Absent"),
        allowNull: false,
        defaultValue: "Present",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Attendance",
      tableName: "attendances",
      timestamps: false,
    },
  );

  return Attendance;
}
