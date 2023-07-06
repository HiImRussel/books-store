/** Express */
import { NextFunction, Request, Response } from "express";

/** Constants */
import { NOT_AUTHORIZED_RESPONSE } from "../constants/auth.constants";

/** Models */
import User from "../models/user.model";

const verifyAdminRole = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req;

    const user = await User.findOne({ where: { id: userId, removed: false } });

    if (!user || !user.isAdmin)
        return res.status(403).json(NOT_AUTHORIZED_RESPONSE);

    next();
};

export default verifyAdminRole;
