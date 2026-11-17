import generateChecksum from "../../../common/helpers/checksum.js";
import DocumentRepository from "../repositories/document.repository.js";

class DuplicateService {

    async check(filePath) {

        const checksum =
            await generateChecksum(filePath);

        const existing =
            await DocumentRepository.findByChecksum(
                checksum
            );

        return {

            checksum,

            exists: !!existing,

            document: existing

        };

    }

}

export default new DuplicateService();