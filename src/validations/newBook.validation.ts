/** Joi */
import Joi from "joi";

const newBookSchema = Joi.object({
    coverImgURL: Joi.string(),
    title: Joi.string().required(),
    author: Joi.string(),
    description: Joi.string().max(255),
    quantity: Joi.number().min(0).required(),
});

export default newBookSchema;
