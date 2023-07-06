/** Config */
import app from "../configs/app.config";

/** Routes */
import authRouter from "./auth.route";
import booksRouter from "./books.route";
import userRouter from "./user.route";
import userLibraryRouter from "./userLibrary.route";
import usersRouter from "./users.route";

app.use("/auth", authRouter);
app.use("/books", booksRouter);
app.use("/user", userRouter);
app.use("/userLibrary", userLibraryRouter);
app.use("/users", usersRouter);
