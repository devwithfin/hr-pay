import express, {Router} from 'express'
const router:Router = express.Router({ mergeParams: true });

import {getAll,create,update,destroy} from "../controllers/employee-allowance.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), getAll);

router.post("/", allowedRole("HR", "Finance"), create);

router.put("/:id", allowedRole("HR", "Finance"), update);

router.delete("/:id", allowedRole("HR", "Finance"), destroy);

export default router;
