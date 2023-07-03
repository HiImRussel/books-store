/** Express */
import { Response } from "express";

/** Joi */
import Joi from "joi";

/** Contstants */
import { STATUS } from "../constants/status";

/** Types */
import { Error } from "../types/error";

export const parseError = (error: Error[], res: Response) =>
    res.status(400).json({
        status: STATUS.ERROR,
        errors: error.map((err) => ({
            field: err.field,
            message: err.message,
        })),
    });

export const parseJoiError = (error: Joi.ValidationError, res: Response) => {
    const errors = error.details.map((err) => ({
        field: err.context?.key || "",
        message: err.message,
    }));

    parseError(errors, res);
};
