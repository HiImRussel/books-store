/** Config */
import app from "../config/app";
import verifyJWT from "../middleware/verifyJWT";

/** Routes */
import authRouter from "./auth";
import booksRouter from "./books";

app.use("/auth", authRouter);
app.use("/books", verifyJWT, booksRouter);
