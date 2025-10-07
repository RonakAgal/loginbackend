import Joi from "joi";
import mongoose from "mongoose";

// Joi.objectId = joiObjectId(Joi);

export const productValidations = Joi.object({
    image: Joi.string(),
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    category: Joi.string().required().trim(),
    brand: Joi.string().required().trim(),
    price: Joi.number().required().min(0),
    salePrice: Joi.number().default(0).min(0),
    totalStock: Joi.number().required().min(0),
    averageReview: Joi.number().default(0).max(5).min(0),
    // createdBy: Joi.number(),
    quantity: Joi.number().required().min(1)
})