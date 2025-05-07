import "dotenv/config";
import { GoogleGenAI, Modality } from "@google/genai";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const imagePath = join(import.meta.dirname, "../input/puppy.png");
const imageData = readFileSync(imagePath);
const base64Image = imageData.toString("base64");

const contents = [
  { text: "Add more toys for the puppy to play with." },
  {
    inlineData: {
      mimeType: "image/png",
      data: base64Image,
    },
  },
];

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash-exp-image-generation",
  contents: contents,
  config: {
    responseModalities: [Modality.TEXT, Modality.IMAGE],
  },
});

for (const part of response.candidates[0].content.parts) {
  if (part.text) {
    console.log(part.text);
  } else if (part.inlineData) {
    const imageData = part.inlineData.data;
    const buffer = Buffer.from(imageData, "base64");

    const outputDir = join(import.meta.dirname, "../output");
    const outputPath = join(outputDir, "puppy-toys.png");
    if (!existsSync(outputDir)) mkdirSync(outputDir);
    writeFileSync(outputPath, buffer);

    console.log(`Image saved as ${outputPath}`);
  }
}
