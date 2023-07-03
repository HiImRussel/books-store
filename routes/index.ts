/** Config */
import app from "../config/app";

/** Routes */
import authRouter from "./auth";

app.use("/auth", authRouter);
