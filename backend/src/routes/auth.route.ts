import express, {Router} from 'express'
const router:Router = express.Router();

import {login, logout} from "../controllers/auth.controller";

import verifyToken from "../middlewares/auth.middleware";
import validate from '../middlewares/validate.middleware';
import { emptyStrictSchema } from '../schemas/global.schema';

router.post("/login", validate(emptyStrictSchema, "query"), login);

router.post("/logout", verifyToken, logout);

export default router;