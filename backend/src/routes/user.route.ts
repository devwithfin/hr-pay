import express, {Router} from 'express'
const router:Router = express.Router();
import {getAllUsers, getProfile, updatePassword} from "../controllers/user.controller";


import verifyToken from "../middlewares/auth.middleware";
import allowedRole from "../middlewares/role.middleware";
import validate from '../middlewares/validate.middleware';
import { emptyStrictSchema, paginationQuerySchema } from '../schemas/global.schema';
import { updatePasswordSchema } from '../schemas/user.schema';
router.use(verifyToken);

router.get("/", validate(paginationQuerySchema, "query"), allowedRole("HR"), getAllUsers);
router.get("/profile", validate(emptyStrictSchema, "query"), getProfile);
router.put("/:id_user",  validate(emptyStrictSchema, "query"), validate(updatePasswordSchema, "body"), updatePassword);

export default router;
