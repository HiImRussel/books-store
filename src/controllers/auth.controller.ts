/** Express */
import { Request, Response } from "express";

/** JWT */
import jwt from "jsonwebtoken";

/** Dotenv */
import dotenv from "dotenv";

/** Bcrypt */
import bcrypt from "bcrypt";

/** Services */
import { parseError, parseJoiError } from "../services/parseError.service";
import defaultSuccess from "../services/defaultSuccess.service";

/** Constants */
import { GENERAL_FIELDS } from "../constants/fields.constants";
import { TOKEN_EXPIRE_TIME_SECONDS } from "../constants/auth.constants";
import { STATUS } from "../constants/status.constants";

/** Validation */
import newUserSchema from "../validations/newUser.validation";
import loginSchema from "../validations/login.validation";

/** Models */
import User from "../models/user.model";

/** Types */
import { Error } from "../types/error";

dotenv.config();

const jwtToken = process.env.JWT_SECRET;
const defaultLoginError: Error[] = [
    {
        field: GENERAL_FIELDS,
        message: "Email or password are incorrect",
    },
];

if (!jwtToken) throw new Error("JWT token is not defined!");

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });

    if (error) return parseJoiError(error, res);

    const user = await User.findOne({
        attributes: { exclude: ["removed"] },
        where: { email, removed: false },
    });

    if (!user) return parseError(defaultLoginError, res);

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return parseError(defaultLoginError, res);

    const token = jwt.sign({ name: user.email, userId: user.id }, jwtToken, {
        expiresIn: `${TOKEN_EXPIRE_TIME_SECONDS}s`,
    });

    (user.password as unknown) = undefined;

    res.json({ user, token, expireTime: TOKEN_EXPIRE_TIME_SECONDS });
};

export const refreshToken = async (req: Request, res: Response) => {
    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];

    if (!token)
        return res
            .sendStatus(401)
            .json({ status: STATUS.ERROR, message: "Token is not defined" });

    jwt.verify(token, jwtToken, async (err, decoded: any) => {
        if (err)
            return res
                .status(401)
                .json({ status: STATUS.ERROR, message: "Token is not valid" });

        const userId = decoded.userId;

        const newToken = jwt.sign(
            { name: decoded.email, userId: userId },
            jwtToken,
            {
                expiresIn: `${TOKEN_EXPIRE_TIME_SECONDS}s`,
            }
        );

        if (!decoded.userId)
            return res
                .sendStatus(401)
                .json({ status: STATUS.ERROR, message: "UserID not found" });

        const user = await User.findOne({
            attributes: { exclude: ["password", "removed"] },
            where: { id: userId, removed: false },
        });

        if (!user)
            return res
                .sendStatus(401)
                .json({ status: STATUS.ERROR, message: "User not found" });

        return res.status(200).json({
            user,
            token: newToken,
            expireTime: TOKEN_EXPIRE_TIME_SECONDS,
        });
    });
};

export const register = async (
    req: Request,
    res: Response,
    registerByAdmin?: boolean
) => {
    const { email, password, phoneNumber, address, city, postalCode } =
        req.body;

    const { error } = newUserSchema.validate({
        email,
        password,
        phoneNumber,
        address,
        city,
        postalCode,
    });

    if (error) return parseJoiError(error, res);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
        email,
        password: passwordHash,
        phoneNumber,
        address,
        city,
        postalCode,
        isAdmin: registerByAdmin ? req.body.isAdmin || false : false,
    };

    const user = await User.findOne({ where: { email } });

    if (user)
        return parseError(
            [{ field: "email", message: "Email already exists" }],
            res
        );

    await User.create(newUser);

    defaultSuccess(res, 201);
};

export const registerByAdmin = (req: Request, res: Response) =>
    register(req, res, true);

export const changePassword = async (req: Request, res: Response) => {
    const { userId } = req;
    const { newPassword } = req.body;

    if (!userId)
        return res.status(400).json({
            status: STATUS.ERROR,
            message: "Failed to update password",
        });

    if (!newPassword || newPassword?.length < 6)
        return parseError(
            [{ field: "password", message: "Password minimum 6 characters" }],
            res
        );

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const targetUser = await User.findOne({ where: { id: userId } });

    if (!targetUser)
        return res
            .status(400)
            .json({ status: STATUS.ERROR, message: "User not found" });

    User.update({ password: passwordHash }, { where: { id: userId } })
        .then(() =>
            res.status(200).json({
                status: STATUS.OK,
                message: "Password updated successfully",
            })
        )
        .catch(() =>
            res.status(400).json({
                status: STATUS.ERROR,
                message: "Failed to update password",
            })
        );
};
