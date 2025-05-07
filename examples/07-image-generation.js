import "dotenv/config";
import { join } from "node:path";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const contents = `Create an image. A cute puppy playing with a ball.`;

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
    const outputPath = join(outputDir, "puppy.png");
    if (!existsSync(outputDir)) mkdirSync(outputDir);
    writeFileSync(outputPath, buffer);

    console.log(`Image saved as ${outputPath}`);
  }
}
