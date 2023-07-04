/** Express */
import { Response } from "express";

/** Sequelize */
import { ValidationError, ValidationErrorItem } from "sequelize";

/** Joi */
import Joi from "joi";

/** Contstants */
import { STATUS } from "../constants/status.constants";

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

export const parseSequelizeError = (error: ValidationError, res: Response) => {
    const errors = error.errors.map((err: ValidationErrorItem) => ({
        field: err.path || "",
        message: err.message,
    }));

    parseError(errors, res);
};
