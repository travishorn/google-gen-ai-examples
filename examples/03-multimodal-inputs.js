import "dotenv/config";
import { join } from "node:path";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const image = await ai.files.upload({
  file: join(import.meta.dirname, "../input/puppy.png"),
});

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    createUserContent([
      "What do you see in this image?",
      createPartFromUri(image.uri, image.mimeType),
    ]),
  ],
});

console.log(response.text);
