import ParserFactory
from "../../../infrastructure/ai/parsers/parser.factory.js";

class ParserService {

    async parse(document) {

        const parser =
            ParserFactory.getParser(
                document.mimeType
            );

        return parser.parse(
            document.storagePath
        );

    }

}

export default new ParserService();