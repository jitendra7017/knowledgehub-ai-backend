import BaseRepository from "../../../common/repositories/BaseRepository.js";
import { DocumentChunk } from "../../../database/models/index.js";

class ChunkRepository extends BaseRepository {

    constructor() {
        super(DocumentChunk);
    }

    async bulkCreate(chunks, options = {}) {
        return this.model.bulkCreate(chunks, options);
    }

    async deleteByDocument(documentId) {
        return this.delete({
            documentId
        });
    }

}

export default new ChunkRepository();