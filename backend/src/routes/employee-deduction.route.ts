import express, {Router} from 'express'
const router:Router = express.Router({ mergeParams: true });

import {getAll,getById,create,update,destroy} from "../controllers/employee-deduction.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), getAll);

router.get("/:id", allowedRole("HR", "Finance"), getById);

router.post("/", allowedRole("HR", "Finance"), create);

router.put("/:id", allowedRole("HR", "Finance"), update);

router.delete("/:id", allowedRole("HR", "Finance"), destroy);

export default router;