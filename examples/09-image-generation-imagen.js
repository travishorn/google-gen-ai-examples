/*
Use Imagen over native Gemini image generation when:
- Image quality, photorealism, artistic detail, or specific styles (e.g., impressionism, anime) are top priorities.
- Performing specialized editing tasks like product background updates or image upscaling.
- Infusing branding, style, or generating logos and product designs.
*/

import "dotenv/config";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateImages({
  model: "imagen-3.0-generate-002",
  prompt: "A mouse playing billiards",
  config: {
    numberOfImages: 4,
  },
});

let i = 0;

for (const generatedImage of response.generatedImages) {
  let imgBytes = generatedImage.image.imageBytes;
  const buffer = Buffer.from(imgBytes, "base64");

  const outputDir = join(import.meta.dirname, "../output");
  const outputPath = join(outputDir, `mouse-billiards-${i}.png`);
  if (!existsSync(outputDir)) mkdirSync(outputDir);

  writeFileSync(outputPath, buffer);

  i++;
}
