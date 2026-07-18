import express, { Router } from 'express'
const router: Router = express.Router();

import { 
  createDraftPayroll, 
  createFinalPayroll, 
  createPayrollTransfer, 
  getAll, 
  create, 
  update, 
  destroy, 
  getById 
} from "../controllers/payroll-period.controller";

import { getByPeriod } from "../controllers/payroll-detail.controller"; 

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";

router.use(verifyToken);

router.get(
  "/:id/details",
  allowedRole("HR", "Finance"), getByPeriod
);

router.post(
  "/draft-payroll/:id",
  allowedRole("HR", "Finance"), createDraftPayroll
);

router.post(
  "/final-payroll/:id",
  allowedRole("HR", "Finance"), createFinalPayroll
);

router.post(
  "/payroll-transfer/:id",
  allowedRole("Finance"), createPayrollTransfer
);

router.get("/", allowedRole("HR", "Finance"), getAll);
router.post("/", allowedRole("HR", "Finance"), create);
router.put("/:id", allowedRole("HR", "Finance"), update);
router.delete("/:id", allowedRole("HR", "Finance"), destroy);
router.get("/:id", allowedRole("HR", "Finance"), getById);

export default router;