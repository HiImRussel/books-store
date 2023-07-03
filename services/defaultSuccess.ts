/** Express */
import { Response } from "express";

/** Constants */
import { STATUS } from "../constants/status";

const defaultSuccess = (res: Response, statusCode: number) =>
    res.status(statusCode).json({ status: STATUS.OK });

export default defaultSuccess;
