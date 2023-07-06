/** Joi */
import Joi from "joi";

const updateUserSchema = Joi.object({
    phoneNumber: Joi.string().min(9).max(12).required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    isAdmin: Joi.boolean(),
});

export default updateUserSchema;
