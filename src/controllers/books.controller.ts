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
import BooksHistory from "../models/booksHistory.model";

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

export const getBooksHistory = async (req: Request, res: Response) => {
    const { userId } = req;
    const { searchTerm } = req.query;
    const { page, pageSize } = getPaginationData(req, "query");

    if (!userId)
        return res
            .status(403)
            .json({ status: STATUS.ERROR, message: "Not authorized!" });

    const query: { [key: string]: any } = {
        order: [["id", "DESC"]],
        ...paginate(page, pageSize),
    };

    if (searchTerm) {
        query["where"] = {};
        query["where"]["message"] = { [Op.like]: `%${searchTerm}%` };
    }

    const booksHistory = await BooksHistory.findAndCountAll(query);

    res.status(200).json({
        status: STATUS.OK,
        ...addPaginationToResponse(
            booksHistory.rows,
            booksHistory.count,
            page,
            pageSize
        ),
    });
};

export const createBook = async (req: Request, res: Response) => {
    const { title, author, description, coverImgURL, quantity } = req.body;
    const { userId } = req;

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
    }).then(async (book) => {
        await BooksHistory.create({
            message: `Book ${book.title} was created! Book ID: ${book.id}, User who created: ${userId}`,
        });
    });

    res.status(201).json({ status: STATUS.OK, data: book });
};

export const updateBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, description, coverImgURL, quantity } = req.body;
    const { userId } = req;

    const { error } = bookSchema.validate({
        title,
        author,
        description,
        coverImgURL,
        quantity,
    });

    if (error) return parseJoiError(error, res);

    const book = await Book.findOne({ where: { id, removed: false } });

    if (!book)
        return res
            .status(404)
            .json({ status: STATUS.ERROR, message: "Book not found!" });

    Book.update(
        { title, author, description, coverImgURL, quantity },
        { where: { id } }
    )
        .then(async () => {
            await BooksHistory.create({
                message: `Book ${book.title} was updated! Book ID: ${book.id}, User who updated: ${userId}`,
            });

            return res.json({ status: STATUS.OK });
        })
        .catch(() =>
            res
                .status(500)
                .json({ status: STATUS.ERROR, message: "Failed to update!" })
        );
};

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req;

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
        .then(async () => {
            await BooksHistory.create({
                message: `Book ${book.title} was deleted! Book ID: ${book.id}, User who deleted: ${userId}`,
            });

            return res.json({ status: STATUS.OK });
        })
        .catch(() =>
            res
                .status(500)
                .json({ status: STATUS.ERROR, message: "Failed to destroy!" })
        );
};
