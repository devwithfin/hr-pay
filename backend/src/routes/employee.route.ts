import express, {Router} from 'express'
const router:Router = express.Router();

import {getAllEmployees,getByIdEmployee,createEmployee,updateEmployee,destroyEmployee} from "../controllers/employee.controller";

// import employeeAllowanceRoute from "./employee-allowance.route";
// import employeeDeductionRoute from "./employee-deduction.route";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";
import validate from '../middlewares/validate.middleware';
import { emptyStrictSchema, paginationQuerySchema } from '../schemas/global.schema';
import { bodySchema } from '../schemas/employee.schema';

router.use(verifyToken);

router.get("/", validate(paginationQuerySchema, "query"), allowedRole("HR", "Finance"), getAllEmployees);

router.get("/:employee_id", validate(emptyStrictSchema, "query"), allowedRole("HR", "Finance", "Employee"), getByIdEmployee);

router.post("/", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR"), createEmployee);

router.put("/:employee_id", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR"), updateEmployee);

router.delete("/:employee_id", validate(emptyStrictSchema, "query"), allowedRole("HR"), destroyEmployee);

// router.use("/:id/allowances", employeeAllowanceRoute);

// router.use("/:id/deductions", employeeDeductionRoute);

export default router;