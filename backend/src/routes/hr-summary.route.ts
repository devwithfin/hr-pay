import express, {Router} from 'express'
const router:Router = express.Router();

import {getSummaryData} from "../controllers/hr-summary.controller";

import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";

router.use(verifyToken);

router.get("/", allowedRole("HR"), getSummaryData);

export default router;