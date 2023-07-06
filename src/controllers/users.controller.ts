/** Express */
import { Request, Response } from "express";

/** Sequelize */
import { Op } from "sequelize";

/** Joi */
import Joi from "joi";

/** Constants */
import { STATUS } from "../constants/status.constants";

/** Services */
import {
    addPaginationToResponse,
    getPaginationData,
    paginate,
} from "../services/paginate.service";
import { parseJoiError } from "../services/parseError.service";

/** Models */
import User from "../models/user.model";

const getUsers = async (req: Request, res: Response) => {
    const { searchTerm } = req.query;
    const { page, pageSize } = getPaginationData(req, "query");
    const { userId } = req;

    const query: { [key: string]: any } = {
        attributes: { exclude: ["password", "removed"] },
        ...paginate(page, pageSize),
    };

    const validationSchema = Joi.object({
        searchTerm: Joi.string().allow(""),
    });

    const { error } = validationSchema.validate({ searchTerm });

    if (error) return parseJoiError(error, res);

    query["where"] = {};
    query["where"]["id"] = { [Op.notLike]: userId };
    query["where"]["removed"] = { [Op.notLike]: true };

    if (searchTerm) {
        query["where"]["email"] = { [Op.like]: `%${searchTerm}%` };
    }

    const users = await User.findAndCountAll(query);

    res.status(200).json({
        status: STATUS.OK,
        ...addPaginationToResponse(users.rows, users.count, page, pageSize),
    });
};

export default getUsers;
