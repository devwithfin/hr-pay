import express, {Router} from 'express'
const router:Router = express.Router();
import {getAllPositions, getByIdPosition, createPosition, updatePosition, destroyPosition} from "../controllers/position.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";
import validate from '../middlewares/validate.middleware';
import { emptyStrictSchema, paginationQuerySchema } from '../schemas/global.schema';
import { bodySchema } from '../schemas/position.schema';

router.use(verifyToken);

router.get("/", validate(paginationQuerySchema, "query"), allowedRole("HR", "Finance", "Employee"), getAllPositions);

router.get("/:position_id",  validate(emptyStrictSchema, "query"), allowedRole("HR", "Finance", "Employee"), getByIdPosition);

router.post("/", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR"), createPosition);

router.put("/:position_id", validate(emptyStrictSchema, "query"), validate(bodySchema, "body"), allowedRole("HR"), updatePosition);

router.delete("/:position_id", validate(emptyStrictSchema, "query"), allowedRole("HR"), destroyPosition);

export default router;
