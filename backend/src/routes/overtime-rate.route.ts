import express, {Router} from 'express'
const router:Router = express.Router();
import {getAllOvertimeRates, getByIdOvertimeRate, createOvertimeRate, updateOvertimeRate, destroyOvertimeRate} from "../controllers/overtime-rate.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";
import validate from '../middlewares/validate.middleware';
import { emptyStrictSchema, paginationQuerySchema } from '../schemas/global.schema';
import { bodySchema } from '../schemas/overtime-rate.schema';

router.use(verifyToken);

router.get("/", validate(paginationQuerySchema, "query"), allowedRole("HR", "Finance"), getAllOvertimeRates);

router.get("/:rate_id", validate(emptyStrictSchema, "query"), allowedRole("HR", "Finance"), getByIdOvertimeRate);

router.post("/", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR"), createOvertimeRate);

router.put("/:rate_id", validate(emptyStrictSchema, "query"),  validate(bodySchema, "body"), allowedRole("HR"), updateOvertimeRate);

router.delete("/:rate_id", validate(emptyStrictSchema, "query"), allowedRole("HR"), allowedRole("HR"), destroyOvertimeRate);

export default router;
