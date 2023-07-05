import { Request, Response, NextFunction } from "express";

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "*");

    next();
};

export default corsMiddleware;
