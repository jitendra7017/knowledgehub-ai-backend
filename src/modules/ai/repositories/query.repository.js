import BaseRepository from "../../../common/repositories/BaseRepository.js";

import { QueryLog } from "../../../database/models/index.js";

class QueryRepository extends BaseRepository {

    constructor() {
        super(QueryLog);
    }

}

export default new QueryRepository();