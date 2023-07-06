/** Express */
import { Router } from "express";

/** Middlewares */
import verifyAdminRole from "../middlewares/verfyAdminRole.middleware";
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Controllers */
import {
    createBook,
    getBooks,
    deleteBook,
    getBook,
    updateBook,
} from "../controllers/books.controller";

/** Routes */
const router = Router();

/** Get */
router.get("/", verifyJWT, getBooks);
router.get("/book/:id", verifyJWT, getBook);

/** Post */
router.post("/create", verifyJWT, verifyAdminRole, createBook);

/** Patch */
router.patch("/update/:id", verifyJWT, verifyAdminRole, updateBook);

/** Delete */
router.delete("/delete/:id", verifyJWT, verifyAdminRole, deleteBook);

export default router;
