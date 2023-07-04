/** Express */
import { Router } from "express";

/** Middlewares */
import verifyAdminRole from "../middlewares/verfyAdminRole.middleware";

/** Controllers */
import {
    createBook,
    getBooks,
    deleteBook,
} from "../controllers/books.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/", getBooks);

/** Post */
router.post("/create", verifyAdminRole, createBook);

/** Delete */
router.delete("/delete/:id", verifyAdminRole, deleteBook);

export default router;
