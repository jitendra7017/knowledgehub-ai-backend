import paginate from "../../../common/helpers/pagination.js";

import DocumentRepository
from "../repositories/document.repository.js";

class ListDocumentsService {

    async execute(query) {

        const {

            limit,

            offset,

            page

        } = paginate(query);

        const {

            rows,

            count

        } = await DocumentRepository.list(

            limit,

            offset

        );

        return {

            items: rows,

            pagination: {

                page,

                limit,

                total: count,

                pages: Math.ceil(
                    count / limit
                )

            }

        };

    }

}

export default new ListDocumentsService();