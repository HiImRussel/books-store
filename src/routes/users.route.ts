/** Express */
import { Router } from "express";

/** Middlewares */
import verifyJWT from "../middlewares/verifyJWT.middleware";
import verifyAdminRole from "../middlewares/verfyAdminRole.middleware";

/** Controllers */
import getUsers from "../controllers/users.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/", verifyJWT, verifyAdminRole, getUsers);

export default router;
