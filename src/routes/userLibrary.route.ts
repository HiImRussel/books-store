/** Express */
import { Router } from "express";

/** Middleware */
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Controllers */
import {
    getUserLibrary,
    getUserLibraryHistory,
    updateBookStatusInLibrary,
} from "../controllers/userLibrary.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/", verifyJWT, getUserLibrary);
router.get("/history", verifyJWT, getUserLibraryHistory);

/** Post */
router.post("/update", verifyJWT, updateBookStatusInLibrary);

export default router;
