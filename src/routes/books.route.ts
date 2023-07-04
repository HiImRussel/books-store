/** Express */
import { Router } from "express";

/** Controllers */
import { getBooks } from "../controllers/books.controller";

const router = Router();

router.get("/all", getBooks);

export default router;
