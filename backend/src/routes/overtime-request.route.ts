import express, {Router} from 'express'
const router:Router = express.Router();

import {getAll,create,getByEmployeeId, updateApproval, destroy} from "../controllers/overtime-request.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), getAll);

router.post("/", allowedRole("Employee"), create);

router.get(
  "/employee/:employee_id",
  allowedRole("HR", "Finance", "Employee"),
 getByEmployeeId
);

router.put(
  "/approve/:request_id",
  allowedRole("HR"),
 updateApproval
);

router.delete(
  "/:request_id",
  allowedRole("HR"),
 destroy
);

export default router;
