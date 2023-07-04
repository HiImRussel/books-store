/** Express */
import { Request, Response } from "express";

/** Modles */
import User from "../models/user.model";

/** Services */
import { parseError } from "../services/parseError.service";

/** Constants */
import { STATUS } from "../constants/status.constants";
import { GENERAL_FIELDS } from "../constants/fields.constants";

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const userToDelete = await User.findOne({ where: { id } });

    if (!userToDelete)
        return parseError(
            [{ field: GENERAL_FIELDS, message: "User not found!" }],
            res
        );

    User.destroy({ where: { id } })
        .then(() => res.json({ status: STATUS.OK }))
        .catch(() =>
            parseError(
                [{ field: GENERAL_FIELDS, message: "Failed to destroy user!" }],
                res
            )
        );
};
