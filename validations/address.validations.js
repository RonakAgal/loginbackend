
import Joi from "joi";

export const addAddressValidation = Joi.object({
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pinCode: Joi.string()
    .required()
    .length(6)
    .pattern(/^[0-9]{6}/)
    .message("Invalid pin code"),
  phone: Joi.string()
    .required()
    .length(10)
    .pattern(/^[6-9]\d{9}/)
    .message("Invalid phone number"),
  notes: Joi.string().allow("").optional(),
});

export const updateAddressValidation = Joi.object({
  address: Joi.string().required().optional(),
  city: Joi.string().required().optional(),
  state: Joi.string().required().optional(),
  pinCode: Joi.string()
    .required()
    .length(6)
    .pattern(/^[0-9]{6}/)
    .message("Invalid pin code")
    .optional(),
  phone: Joi.string()
    .required()
    .length(10)
    .pattern(/^[6-9]\d{9}/)
    .message("Invalid phone number")
    .optional(),
  notes: Joi.string().allow("").optional(),
});
