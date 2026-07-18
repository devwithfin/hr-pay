import express, {Router} from 'express'
const router:Router = express.Router();
import {getAllDeductions, getByIdDeduction, createDeduction, updateDeduction, destroyDeduction} from "../controllers/deduction.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";
import validate from '../middlewares/validate.middleware';
import { emptyStrictSchema, paginationQuerySchema } from '../schemas/global.schema';
import { bodySchema } from '../schemas/deduction.schema';

router.use(verifyToken);

router.get("/", validate(paginationQuerySchema, "query"), allowedRole("HR", "Finance"), getAllDeductions);

router.get("/:deduction_id", validate(emptyStrictSchema, "query"), allowedRole("HR", "Finance"), getByIdDeduction);

router.post("/", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR", "Finance"), createDeduction);

router.put("/:deduction_id", validate(emptyStrictSchema, "query"),  validate(bodySchema, "body"), allowedRole("HR", "Finance"), updateDeduction);

router.delete("/:deduction_id", validate(emptyStrictSchema, "query"), allowedRole("HR", "Finance"), destroyDeduction);

export default router;
