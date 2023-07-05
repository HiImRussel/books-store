/** Express */
import { NextFunction, Response, Request } from "express";

/** JWT */
import jwt from "jsonwebtoken";

/** Dotenv */
import dotenv from "dotenv";

/** Constants */
import { NOT_AUTHORIZED_RESPONSE } from "../constants/auth.constants";

dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) throw new Error("JWT token is not defined!");

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token || !secret) return res.status(403).json(NOT_AUTHORIZED_RESPONSE);

    jwt.verify(token, secret, (err, decoded: any) => {
        if (err) return res.status(403).json(NOT_AUTHORIZED_RESPONSE);

        req.userId = decoded?.userId;

        next();
    });
};

export default verifyJWT;
