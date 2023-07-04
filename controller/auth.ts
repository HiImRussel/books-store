/** Express */
import { Request, Response } from "express";

/** JWT */
import jwt from "jsonwebtoken";

/** Dotenv */
import dotenv from "dotenv";

/** Bcrypt */
import bcrypt from "bcrypt";

/** Services */
import { parseError, parseJoiError } from "../services/parseError";
import defaultSuccess from "../services/defaultSuccess";

/** Constants */
import { GENERAL_FIELDS } from "../constants/fields";
import { TOKEN_EXPIRE_TIME_SECONDS } from "../constants/auth";

/** Validation */
import newUserSchema from "../validation/newUser";
import loginSchema from "../validation/login";

/** Models */
import User from "../models/user";

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

    const user = await User.findOne({ where: { email } });

    if (!user) return parseError(defaultLoginError, res);

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return parseError(defaultLoginError, res);

    const token = jwt.sign({ name: user.email, userId: user.id }, jwtToken, {
        expiresIn: `${TOKEN_EXPIRE_TIME_SECONDS}s`,
    });

    res.json({ user, token });
};

export const register = async (req: Request, res: Response) => {
    const { email, password, address, phoneNumber } = req.body;

    const { error } = newUserSchema.validate({
        email,
        password,
        address,
        phoneNumber,
    });

    if (error) return parseJoiError(error, res);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
        email,
        password: passwordHash,
        address: address.address,
        city: address.city,
        postalCode: address.postalCode,
        phoneNumber,
    };

    if (newUser instanceof User) {
        const error: Error[] = [
            { field: "email", message: "Email already exists" },
        ];

        return parseError(error, res);
    }

    await User.create(newUser);

    defaultSuccess(res, 201);
};
