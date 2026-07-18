import { Request, Response } from "express";

import db from "../models";
const {PayrollDetail, Employee} = db;

export const getByPeriod = async (req: Request, res: Response) => {
    try {
      const periodId = req.params.id;

      const payrolls = await PayrollDetail.findAll({
        where: { period_id: periodId },
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: [
              "employee_id",
              "full_name",
              "bank_name",
              "bank_account_number",
            ],
          },
        ],
      });

      res
        .status(200)
        .json({ message: "Payroll details fetched", data: payrolls });
    } catch (error) {
      console.error("Error fetching payroll details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

