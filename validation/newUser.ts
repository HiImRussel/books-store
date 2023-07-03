/** Joi */
import Joi from "joi";

const newUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        postalCode: Joi.string().required(),
    }).required(),
    phoneNumber: Joi.string().min(9).max(12).required(),
});

export default newUserSchema;
