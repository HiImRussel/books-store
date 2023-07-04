/** Constants */
import { STATUS } from "./status.constants";

export const TOKEN_EXPIRE_TIME_SECONDS = 3600;
export const NOT_AUTHORIZED_RESPONSE = {
    status: STATUS.ERROR,
    message: "Unauthorized!",
};
