/** Config */
import app from "../configs/app.config";
import verifyJWT from "../middlewares/verifyJWT.middleware";

/** Routes */
import authRouter from "./auth.route";
import booksRouter from "./books.route";
import userRouter from "./user.route";

app.use("/auth", authRouter);
app.use("/books", verifyJWT, booksRouter);
app.use("/user", verifyJWT, userRouter);