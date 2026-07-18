import express, {Router} from 'express'
const router:Router = express.Router();
import {getAllDepartments, getByIdDepartment, createDepartment, updateDepartment, destroyDepartment} from "../controllers/department.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";
import validate from '../middlewares/validate.middleware';
import { emptyStrictSchema, paginationQuerySchema } from '../schemas/global.schema';
import { bodySchema } from '../schemas/department.schema';

router.use(verifyToken);

router.get("/", validate(paginationQuerySchema, "query"), allowedRole("HR", "Finance", "Employee"), getAllDepartments);

router.get("/:department_id", validate(emptyStrictSchema, "query"), allowedRole("HR", "Finance", "Employee"), getByIdDepartment);

router.post("/", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR"), createDepartment);

router.put("/:department_id", validate(emptyStrictSchema, "query"),  validate(bodySchema, "body"), allowedRole("HR"), updateDepartment);

router.delete("/:department_id", validate(emptyStrictSchema, "query"), allowedRole("HR"), destroyDepartment);

export default router;
