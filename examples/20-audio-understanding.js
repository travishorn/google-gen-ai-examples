import "dotenv/config";
import { join } from "node:path";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const audio = await ai.files.upload({
  file: join(import.meta.dirname, "../input/i-have-a-dream.mp3"),
});

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    createUserContent([
      "Generate a transcript of the speech",
      createPartFromUri(audio.uri, audio.mimeType),
    ]),
  ],
});

console.log(response.text);
