import express, {Router} from 'express'
const router:Router = express.Router();
import {getAllAllowances, getByIdAllowance, createAllowance, updateAllowance, destroyAllowance} from "../controllers/allowance.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";
import validate from '../middlewares/validate.middleware';
import { emptyStrictSchema, paginationQuerySchema } from '../schemas/global.schema';
import { bodySchema } from '../schemas/allowance.schema';

router.use(verifyToken);

router.get("/", validate(paginationQuerySchema, "query"), allowedRole("HR", "Finance"), getAllAllowances);

router.get("/:allowance_id",  validate(emptyStrictSchema, "query"), allowedRole("HR", "Finance"), getByIdAllowance);

router.post("/", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR"), createAllowance);

router.put("/:allowance_id", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR"), updateAllowance);

router.delete("/:allowance_id", validate(emptyStrictSchema, "query"), allowedRole("HR"), destroyAllowance);

export default router;
