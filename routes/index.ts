/** Config */
import app from "../config/app";
import authJWT from "../middleware/authJWT";

/** Routes */
import authRouter from "./auth";
import booksRouter from "./books";

app.use("/auth", authRouter);
app.use("/books", authJWT, booksRouter);
