/** Express */
import { Request, Response } from "express";

/** Constants */
import { NOT_AUTHORIZED_RESPONSE } from "../constants/auth.constants";
import { STATUS } from "../constants/status.constants";

/** Services */
import {
    addPaginationToResponse,
    getPaginationData,
    paginate,
} from "../services/paginate.service";

/** Models */
import UserLibrary from "../models/userLibrary.model";
import Book from "../models/book.model";

export const getUserLibrary = async (req: Request, res: Response) => {
    const { userId } = req;
    const { page, pageSize } = getPaginationData(req, "query");

    if (!userId) return res.status(403).json(NOT_AUTHORIZED_RESPONSE);

    const userLibrary = await UserLibrary.findAndCountAll({
        where: { userId },
        ...paginate(page, pageSize),
    });
    const books = await Book.findAndCountAll({
        where: { id: userLibrary.rows.map((book) => book.bookId) },
    });
    const booksData = books.rows.map((book) => {
        const data = { ...book.dataValues };
        (data as Book & { isInUserLibrary: boolean })["isInUserLibrary"] = true;

        return data;
    });

    res.status(200).json({
        status: STATUS.OK,
        ...addPaginationToResponse(
            booksData,
            userLibrary.count,
            page,
            pageSize
        ),
    });
};

export const updateBookStatusInLibrary = async (
    req: Request,
    res: Response
) => {
    const { userId } = req;
    const { bookId } = req.body;

    if (!userId) return res.status(403).json(NOT_AUTHORIZED_RESPONSE);
    if (!bookId)
        return res
            .status(400)
            .json({ status: STATUS.ERROR, message: "Book id is required!" });

    const book = await Book.findOne({ where: { id: bookId } });

    if (!book)
        return res
            .status(404)
            .json({ status: STATUS.ERROR, message: "Book not found!" });

    const bookInLibrary = await UserLibrary.findOne({
        where: { userId, bookId },
    });

    if (book.quantity === 0 && !bookInLibrary)
        return res
            .status(400)
            .json({ status: STATUS.ERROR, message: "Book is not available!" });

    if (!bookInLibrary) {
        await UserLibrary.create({ userId, bookId });
        await Book.decrement("quantity", { where: { id: bookId } });
    } else {
        await UserLibrary.destroy({ where: { userId, bookId } });
        await Book.increment("quantity", { where: { id: bookId } });
    }

    const updatedBook = await Book.findOne({ where: { id: bookId } });

    if (!updatedBook)
        return res
            .status(404)
            .json({ status: STATUS.ERROR, message: "Book not found!" });

    const bookResponse = { ...updatedBook.dataValues };
    (bookResponse as Book & { isInUserLibrary: boolean })["isInUserLibrary"] =
        !bookInLibrary;

    res.status(200).json({ status: STATUS.OK, data: bookResponse });
};
