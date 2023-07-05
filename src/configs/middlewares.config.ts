/** Body parser */
import bodyParser from "body-parser";

/** Cors */
import cors from "cors";

/** Config */
import app from "./app.config";
import { jsonParser } from "./setup.config";

/** Midleware */
import corsMiddleware from "../middlewares/cors.middleware";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonParser);
app.use(cors());
app.use(corsMiddleware);
