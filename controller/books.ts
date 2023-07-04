/** Express */
import { Request, Response } from "express";

export const getBooks = (req: Request, res: Response) => {
    console.log(req.userId);
    res.status(200).json({ message: "getBooks" });
};
