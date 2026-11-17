import DuplicateService from "./duplicate.service.js";
import DocumentRepository from "../repositories/document.repository.js";
import documentQueue from "../../../infrastructure/queue/document.queue.js";

import DOCUMENT_STATUS from "../../../common/constants/document-status.js";

class UploadService {

    async upload(file, userId) {

        const duplicate = await DuplicateService.check(file.path);

        if (duplicate.exists) {
            return {
                duplicate: true,
                document: duplicate.document
            };
        }

        const document = await DocumentRepository.create({

            title: file.originalname,

            originalName: file.originalname,

            storedName: file.filename,

            mimeType: file.mimetype,

            extension: file.originalname.split(".").pop(),

            size: file.size,

            checksum: duplicate.checksum,

            storagePath: file.path,

            uploadedBy: userId,

            status: DOCUMENT_STATUS.QUEUED

        });

        await documentQueue.add(
            "process-document",
            {
                documentId: document.id
            }
        );

        return {

            duplicate: false,

            document

        };

    }

}

export default new UploadService();