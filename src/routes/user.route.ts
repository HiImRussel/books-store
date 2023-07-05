/** Express */
import { Router } from "express";

/** Middlewares */
import verifyAdminRole from "../middlewares/verfyAdminRole.middleware";
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Controllers */
import { deleteUser } from "../controllers/user.controller";

/** Routes */
const router = Router();

/** Delete */
router.use(verifyJWT, verifyAdminRole);
router.delete("/delete/:id", deleteUser);

export default router;
