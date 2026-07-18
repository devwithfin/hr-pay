import express, {Router} from 'express'
const router:Router = express.Router();
import {getAll,getByEmployeeId,clockIn,clockOut} from "../controllers/attendance.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), getAll);

router.get("/employee/:employee_id", allowedRole("HR", "Finance", "Employee"), getByEmployeeId);

router.post("/clock-in",  allowedRole("HR", "Finance", "Employee"),clockIn);

router.post("/clock-out",  allowedRole("HR", "Finance", "Employee"),clockOut);

export default router;