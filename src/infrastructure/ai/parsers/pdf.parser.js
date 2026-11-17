import fs from "node:fs/promises";
import pdf from "pdf-parse";

class PdfParser {

    /**
     * Parse PDF document
     * @param {string} filePath
     * @returns {Promise<string>}
     */
    async parse(filePath) {

        const buffer = await fs.readFile(filePath);

        const result = await pdf(buffer);

        return result.text;

    }

}

export default new PdfParser();