/** Joi */
import Joi from "joi";

const bookSchema = Joi.object({
    coverImgURL: Joi.string().uri().required(),
    title: Joi.string().required(),
    author: Joi.string(),
    description: Joi.string().max(255).required(),
    quantity: Joi.number().min(0).required(),
});

export default bookSchema;
