/** Body parser */
import bodyParser from "body-parser";

/** Config */
import app from "./app.config";
import { jsonParser } from "./setup.config";

/** Midleware */
import corsMiddleware from "../middlewares/cors.middleware";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonParser);
app.use(corsMiddleware);
