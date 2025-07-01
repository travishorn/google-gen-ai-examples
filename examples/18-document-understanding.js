import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const documentPath = join(
  import.meta.dirname,
  "../input/f-150-service-manual.pdf",
);

const contents = [
  { text: "How do I change the oil in my truck?" },
  {
    inlineData: {
      // Supported: application/pdf, applicaton/x-javascript, text/javascript, application/x-python, text/x-python, text/plain, text/html, text/css, text/md, text/csv, text/xml, text/rtf
      mimeType: "application/pdf",
      data: Buffer.from(readFileSync(documentPath)).toString("base64"),
    },
  },
];

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: contents,
});

console.log(response.text);
