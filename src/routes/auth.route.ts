/** Express */
import { Request, Response, Router } from "express";

/** Middleware */
import verifyJWT from "../middlewares/verifyJWT.middleware";
import verifyAdminRole from "../middlewares/verfyAdminRole.middleware";

/** Controllers */
import {
    login,
    register,
    refreshToken,
    registerByAdmin,
    changePassword,
} from "../controllers/auth.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/refreshToken", verifyJWT, refreshToken);

/** Post */
router.post("/login", login);
router.post("/register", (req: Request, res: Response) => register(req, res));
router.post("/registerByAdmin", verifyJWT, verifyAdminRole, registerByAdmin);

/** Patch */
router.patch("/changePassword", verifyJWT, changePassword);

export default router;
