/** Express */
import { Request } from "express";

/** Constants */
import {
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
} from "../constants/pagination.constants";

export const paginate = (page: number, pageSize: number) => {
    const offset = page * pageSize;
    const limit = pageSize;

    return {
        offset,
        limit,
    };
};

export const getPaginationData: (
    req: Request,
    findIn: "query" | "body" | "params"
) => {
    page: number;
    pageSize: number;
} = (req, findIn) => {
    let { page, pageSize } = req[findIn];

    page = typeof +page === "number" && page ? +page : DEFAULT_PAGE;
    pageSize =
        typeof +pageSize === "number" && pageSize
            ? +pageSize
            : DEFAULT_PAGE_SIZE;

    page = page - 1 >= 0 ? page - 1 : 0;

    return {
        page,
        pageSize,
    };
};

export const addPaginationToResponse = (
    rows: unknown[],
    count: number,
    page: number,
    pageSize: number
) => ({
    data: rows,
    pagination: {
        page: page + 1,
        pageSize,
        totalPages: Math.ceil(count / pageSize),
    },
});
