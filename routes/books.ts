/** Express */
import { Router } from "express";

/** Controllers */
import { getBooks } from "../controller/books";

const router = Router();

router.get("/all", getBooks);

export default router;
