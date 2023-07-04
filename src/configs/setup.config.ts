/** Dotenv */
import dotenv from "dotenv";

/** Body parser */
import bodyParser from "body-parser";

dotenv.config();
const jsonParser = bodyParser.json();

const apiPort = process.env.API_PORT || 3000;

export { apiPort, jsonParser };
