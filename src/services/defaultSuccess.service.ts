/** Express */
import { Response } from "express";

/** Constants */
import { STATUS } from "../constants/status.constants";

const defaultSuccess = (res: Response, statusCode: number) =>
    res.status(statusCode).json({ status: STATUS.OK });

export default defaultSuccess;
