import { Router } from "express";

import accountRoute from "./user.route";
import authRoute from "../routes/auth.route";
import allowanceRoute from "../routes/allowance.route";
import attendanceRoute from "../routes/attendance.route";
import departmentRoute from "../routes/department.route";
import deductionRoute from "../routes/deduction.route";
import employeeRoute from "../routes/employee.route";
import employeeSummaryRoute from "../routes/employee-summary.route";
import hrSummaryRoute from "../routes/hr-summary.route";
import overtimeRateRoute from "../routes/overtime-rate.route";
import overtimeRequestRoute from "../routes/overtime-request.route";
import payrollPeriodRoute from "../routes/payroll-period.route";
import positionRoute from "../routes/position.route";

const mainRouter: Router = Router();

mainRouter.use("/users", accountRoute);
mainRouter.use("/auth", authRoute);
mainRouter.use("/allowances", allowanceRoute);
mainRouter.use("/attendances", attendanceRoute);
mainRouter.use("/departments", departmentRoute);
mainRouter.use("/deductions", deductionRoute);
mainRouter.use("/employee-summaries", employeeSummaryRoute);
mainRouter.use("/employees", employeeRoute);
mainRouter.use("/hr-summaries", hrSummaryRoute);
mainRouter.use("/overtime-rates", overtimeRateRoute);
mainRouter.use("/overtime-requests", overtimeRequestRoute);
mainRouter.use("/payroll-periods", payrollPeriodRoute);
mainRouter.use("/positions", positionRoute);

export default mainRouter;
