/** Express */
import { Router } from "express";

/** Controllers */
import { login } from "../controller/auth";

/** Routes */
const router = Router();

router.post("/login", login);

export default router;
