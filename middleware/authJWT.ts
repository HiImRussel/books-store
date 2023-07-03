/** Express */
import { NextFunction, Response, Request } from "express";

/** JWT */
import jwt from "jsonwebtoken";

/** Dotenv */
import dotenv from "dotenv";

/** Constants */
import { STATUS } from "../constants/status";

/** Types */
interface JWtRequest extends Request {
    userId?: string;
}

dotenv.config();

const notAuthorizedResponse = {
    status: STATUS.ERROR,
    message: "Unauthorized!",
};
const secret = process.env.JWT_SECRET;

if (!secret) throw new Error("JWT token is not defined!");

const authJWT = (req: JWtRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token || !secret) return res.status(403).json(notAuthorizedResponse);

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) return res.status(401).json(notAuthorizedResponse);

        req.userId = decoded.id;
        next();
    });
};

export default authJWT;
