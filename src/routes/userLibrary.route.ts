/** Express */
import { Router } from "express";

/** Controllers */
import {
    getUserLibrary,
    updateBookStatusInLibrary,
} from "../controllers/userLibrary.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/", getUserLibrary);

/** Post */
router.post("/update", updateBookStatusInLibrary);

export default router;
