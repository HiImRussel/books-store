/** Config */
import app from "./src/configs/app.config";
import { apiPort } from "./src/configs/setup.config";
import "./src/configs/middlewares.config";
import "./src/routes";
import "./src/configs/db.config";

/** Constants */
import { STATUS } from "./src/constants/status.constants";

app.all("*", (req, res) => {
    res.status(404).json({ status: STATUS.ERROR, message: "Not Found" });
});

app.listen(apiPort, () =>
    console.log(`⚡️[server]: Server is running at http://127.0.0.1:${apiPort}`)
).on("error", (err) => {
    process.once("SIGUSR2", () => process.kill(process.pid, "SIGUSR2"));
    process.on("SIGINT", () => process.kill(process.pid, "SIGINT"));
});
