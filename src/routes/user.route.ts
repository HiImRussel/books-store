/** Express */
import { Router } from "express";

/** Controllers */
import { deleteUser } from "../controllers/user.controller";

/** Routes */
const router = Router();

/** Delete */
router.delete("/delete/:id", deleteUser);

export default router;
