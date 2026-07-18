import express, {Router} from 'express'
const router:Router = express.Router();

import {getSummaryData} from "../controllers/employee-summary.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";

router.use(verifyToken);

router.get(
  "/:id",
  allowedRole("HR", "Finance", "Employee"),
  getSummaryData
);

export default router;
