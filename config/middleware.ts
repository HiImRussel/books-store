/** Body parser */
import bodyParser from "body-parser";

/** Config */
import app from "./app";
import { jsonParser } from "./setup";

/** Midleware */
import corsMiddleware from "../middleware/cors";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonParser);
app.use(corsMiddleware);
