import AskQuestionService from "../services/ask-question.service.js";

import { successResponse } from "../../../common/helpers/response.js";

class QueryController {

    async ask(req, res, next) {

        try {

            const result =
                await AskQuestionService.ask(

                    req.body.question,

                    req.user.sub

                );

            return successResponse(

                res,

                result,

                "Answer generated."

            );

        } catch (error) {

            next(error);

        }

    }

}

export default new QueryController();