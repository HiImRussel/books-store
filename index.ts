/** Config */
import app from "./config/app";
import { apiPort } from "./config/setup";
import "./config/middleware";
import "./routes";
import "./config/db";

/** Constants */
import { STATUS } from "./constants/status";

app.all("*", (req, res) => {
    res.status(404).json({ status: STATUS.ERROR, message: "Not Found" });
});

app.listen(apiPort, () =>
    console.log(`⚡️[server]: Server is running at http://127.0.0.1:${apiPort}`)
).on("error", (err) => {
    process.once("SIGUSR2", () => process.kill(process.pid, "SIGUSR2"));
    process.on("SIGINT", () => process.kill(process.pid, "SIGINT"));
});
