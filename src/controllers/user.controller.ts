/** Express */
import { Request, Response } from "express";

/** Modles */
import User from "../models/user.model";

/** Validation */
import updateUserSchema from "../validations/updateUser.validation";

/** Services */
import { parseError, parseJoiError } from "../services/parseError.service";

/** Constants */
import { STATUS } from "../constants/status.constants";
import { GENERAL_FIELDS } from "../constants/fields.constants";

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const convertedId = id ? +id : 0;

    if (!id || isNaN(convertedId))
        return parseError(
            [{ field: GENERAL_FIELDS, message: "User not found!" }],
            res
        );

    const user = await User.findOne({
        attributes: { exclude: ["password", "removed"] },
        where: { id: convertedId, removed: false },
    });

    if (!user)
        return parseError(
            [{ field: GENERAL_FIELDS, message: "User not found!" }],
            res
        );

    res.status(200).json({
        status: STATUS.OK,
        user,
    });
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req;
    const { id } = req.params;
    const { phoneNumber, address, city, postalCode } = req.body;
    let { isAdmin } = req.body;

    if (!id || !userId)
        return parseError(
            [{ field: GENERAL_FIELDS, message: "User not found!" }],
            res
        );

    const userWhichUpdating = await User.findOne({ where: { id: userId } });

    if (!userWhichUpdating)
        return parseError(
            [{ field: GENERAL_FIELDS, message: "User not found!" }],
            res
        );

    if (!userWhichUpdating.isAdmin && userId !== +id)
        return res.status(403).json({
            status: STATUS.ERROR,
            errors: [
                {
                    field: GENERAL_FIELDS,
                    message: "You are not allowed to update this user!",
                },
            ],
        });

    if (!userWhichUpdating.isAdmin) {
        isAdmin = undefined;
    }

    const { error } = updateUserSchema.validate({
        phoneNumber,
        address,
        city,
        postalCode,
        isAdmin,
    });

    if (error) return parseJoiError(error, res);

    if (!userWhichUpdating)
        return parseError(
            [{ field: GENERAL_FIELDS, message: "User not found!" }],
            res
        );

    const dataToUpdate = {
        phoneNumber,
        address,
        city,
        postalCode,
        isAdmin: userWhichUpdating.isAdmin ? isAdmin : false,
    };

    const userToUpdate = await User.findOne({ where: { id, removed: false } });

    if (!userToUpdate)
        return parseError(
            [{ field: GENERAL_FIELDS, message: "User not found!" }],
            res
        );

    User.update(dataToUpdate, { where: { id } })
        .then(() => {
            res.status(200).json({
                status: STATUS.OK,
            });
        })
        .catch(() => {
            parseError(
                [{ field: GENERAL_FIELDS, message: "Failed to update user!" }],
                res
            );
        });
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const userToDelete = await User.findOne({ where: { id } });

    if (!userToDelete)
        return parseError(
            [{ field: GENERAL_FIELDS, message: "User not found!" }],
            res
        );

    User.update({ removed: true }, { where: { id } })
        .then(() => res.json({ status: STATUS.OK }))
        .catch(() =>
            parseError(
                [{ field: GENERAL_FIELDS, message: "Failed to destroy user!" }],
                res
            )
        );
};
