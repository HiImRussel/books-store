/** Express */
import { Router } from "express";

/** Middleware */
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Controllers */
import {
    getUserLibrary,
    updateBookStatusInLibrary,
} from "../controllers/userLibrary.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/", verifyJWT, getUserLibrary);

/** Post */
router.post("/update", verifyJWT, updateBookStatusInLibrary);

export default router;
