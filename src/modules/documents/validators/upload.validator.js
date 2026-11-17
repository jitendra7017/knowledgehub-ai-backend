import Joi from "joi";

export const uploadSchema = Joi.object({
    body: Joi.object({}),

    query: Joi.object({}),

    params: Joi.object({})
});