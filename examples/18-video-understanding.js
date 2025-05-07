import "dotenv/config";
import { join } from "node:path";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const video = await ai.files.upload({
  file: join(import.meta.dirname, "../input/puppy-0.mp4"),
});

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    createUserContent([
      "What breed of dog is this?",
      createPartFromUri(video.uri, video.mimeType),
    ]),
  ],
});

console.log(response.text);
