import BaseRepository from "../../../common/repositories/BaseRepository.js";

import {
    Document,
    DocumentChunk,
    User
} from "../../../database/models/index.js";

class DocumentRepository extends BaseRepository {

    constructor() {
        super(Document);
    }

    async findByChecksum(checksum) {
        return this.findOne({ checksum });
    }

    async findByUuid(uuid) {

        return this.findOne(
            { uuid },
            {
                include: [
                    {
                        model: User,
                        as: "owner",
                        attributes: [
                            "uuid",
                            "firstName",
                            "lastName",
                            "email"
                        ]
                    }
                ]
            }
        );

    }

    async list(limit, offset) {

        return this.model.findAndCountAll({

            limit,

            offset,

            order: [
                ["createdAt", "DESC"]
            ],

            include: [
                {
                    model: User,
                    as: "owner",
                    attributes: [
                        "uuid",
                        "firstName",
                        "lastName"
                    ]
                }
            ]

        });

    }

    async getChunks(documentId) {

        return DocumentChunk.findAll({

            where: {
                documentId
            },

            order: [
                ["chunkIndex", "ASC"]
            ]

        });

    }

    async updateStatus(id, status, values = {}) {

        return this.update(
            { id },
            {
                status,
                ...values
            }
        );

    }

}

export default new DocumentRepository();