import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const OPENAPI_PATH = path.join(
    process.cwd(),
    "docs",
    "openapi",
    "v1",
    "openapi.bundle.yaml"
);

const openApiDocument = YAML.parse(fs.readFileSync(OPENAPI_PATH, "utf8"));

export default openApiDocument;