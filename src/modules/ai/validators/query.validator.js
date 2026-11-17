import Joi from "joi";

export const askQuestionSchema = Joi.object({

    body: Joi.object({

        question: Joi.string()
            .trim()
            .min(3)
            .max(5000)
            .required()

    }),

    query: Joi.object({}),

    params: Joi.object({})

});