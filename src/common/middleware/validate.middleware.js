import ValidationError from "../errors/ValidationError.js";

export default function validate(schema) {

    return (req, res, next) => {

        const { error, value } = schema.validate(
            {
                body: req.body,
                query: req.query,
                params: req.params
            },
            {
                abortEarly: false,
                stripUnknown: true
            }
        );

        if (error) {

            return next(
                new ValidationError(
                    "Validation failed.",
                    error.details
                )
            );

        }

        req.body = value.body;
        req.query = value.query;
        req.params = value.params;

        next();

    };

}