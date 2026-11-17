import PdfParser from "./pdf.parser.js";

class ParserFactory {

    getParser(mimeType) {

        switch (mimeType) {

            case "application/pdf":
                return PdfParser;

            default:
                throw new Error(
                    `Unsupported file type: ${mimeType}`
                );

        }

    }

}

export default new ParserFactory();