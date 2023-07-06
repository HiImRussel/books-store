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
    paginate,
    getPaginationData,
    addPaginationToResponse,
} from "./../services/paginate.service";
import { parseJoiError } from "../services/parseError.service";

/** Validation */
import bookSchema from "../validations/book.validation";

/** Models */
import Book from "../models/book.model";
import UserLibrary from "../models/userLibrary.model";

export const getBooks = async (req: Request, res: Response) => {
    const { searchTerm } = req.query;
    const { page, pageSize } = getPaginationData(req, "query");

    const query: { [key: string]: any } = {
        ...paginate(page, pageSize),
    };

    const validationSchema = Joi.object({
        searchTerm: Joi.string().allow(""),
    });

    const { error } = validationSchema.validate({ searchTerm });

    if (error) return parseJoiError(error, res);

    query["where"] = {};
    query["where"]["removed"] = { [Op.notLike]: true };

    if (searchTerm) {
        query["where"]["title"] = { [Op.like]: `%${searchTerm}%` };
    }

    const books = await Book.findAndCountAll(query);

    res.status(200).json({
        status: STATUS.OK,
        ...addPaginationToResponse(books.rows, books.count, page, pageSize),
    });
};

export const getBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req;

    if (!id)
        return res
            .status(400)
            .json({ status: STATUS.ERROR, message: "Book id is required!" });

    const book = await Book.findOne({ where: { id } });
    const isInUserLibrary = await UserLibrary.findOne({
        where: { userId, bookId: id },
    });

    if (!book)
        return res
            .status(404)
            .json({ status: STATUS.ERROR, message: "Book not found!" });

    const bookResponse = { ...book.dataValues };
    (bookResponse as Book & { isInUserLibrary: boolean })["isInUserLibrary"] =
        !!isInUserLibrary;

    res.status(200).json({ status: STATUS.OK, data: bookResponse });
};

export const createBook = async (req: Request, res: Response) => {
    const { title, author, description, coverImgURL, quantity } = req.body;

    const { error } = bookSchema.validate({
        title,
        author,
        description,
        coverImgURL,
        quantity,
    });

    if (error) return parseJoiError(error, res);

    const book = await Book.create({
        title,
        author,
        description,
        coverImgURL,
        quantity,
    });

    res.status(201).json({ status: STATUS.OK, data: book });
};

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id)
        return res
            .status(400)
            .json({ status: STATUS.ERROR, message: "Book id is required!" });

    const book = await Book.findOne({ where: { id, removed: false } });

    if (!book)
        return res
            .status(404)
            .json({ status: STATUS.ERROR, message: "Book not found!" });

    Book.update({ removed: true, quantity: 0 }, { where: { id } })
        .then(() => res.json({ status: STATUS.OK }))
        .catch(() =>
            res
                .status(500)
                .json({ status: STATUS.ERROR, message: "Failed to destroy!" })
        );
};
