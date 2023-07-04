/** Express */
import { Router, Request, Response } from "express";

/** Middleware */
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Controllers */
import {
    login,
    register,
    loginAdmin,
    refreshToken,
} from "../controllers/auth.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/refreshToken", verifyJWT, refreshToken);

/** Post */
router.post("/login", (req: Request, res: Response) => login(req, res));
router.post("/register", register);
router.post("/login-admin", loginAdmin);

export default router;
