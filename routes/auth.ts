/** Express */
import { Router } from "express";

/** Controllers */
import { login, register } from "../controller/auth";

/** Routes */
const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
