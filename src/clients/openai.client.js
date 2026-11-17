import OpenAI from "openai";

import env from "../config/env.js";

const openai = new OpenAI({
  apiKey: env.openai.apiKey
});

export default openai;