/** Express */
import { Router } from "express";

/** Middlewares */
import verifyAdminRole from "../middlewares/verfyAdminRole.middleware";
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Controllers */
import {
    deleteUser,
    getUser,
    updateUser,
} from "../controllers/user.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/:id", verifyJWT, verifyAdminRole, getUser);

/** Delete */
router.delete("/delete/:id", verifyJWT, verifyAdminRole, deleteUser);

/** Patch */
router.patch("/update/:id", verifyJWT, updateUser);

export default router;
