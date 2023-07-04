/** Express */
import { Router } from "express";

/** Middlewares */
import verifyAdminRole from "../middlewares/verfyAdminRole.middleware";

/** Controllers */
import { deleteUser } from "../controllers/user.controller";

/** Routes */
const router = Router();

/** Delete */
router.delete("/delete/:id", verifyAdminRole, deleteUser);

export default router;
