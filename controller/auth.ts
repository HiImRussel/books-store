/** Express */
import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    const { data } = req.body;

    res.json({ account: "siema" });
};
