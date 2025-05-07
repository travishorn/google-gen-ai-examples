import "dotenv/config";
import {
  readFileSync,
  createWriteStream,
  existsSync,
  mkdirSync,
} from "node:fs";
import { join } from "node:path";
import { Readable } from "node:stream";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const imagePath = join(import.meta.dirname, "../input/puppy.png");
const imageBytes = readFileSync(imagePath);

let operation = await ai.models.generateVideos({
  model: "veo-2.0-generate-001",
  prompt: "A cute puppy playing with a ball",
  image: {
    imageBytes,
    mimeType: "image/png",
  },
  config: {
    aspectRatio: "16:9",
    numberOfVideos: 2,
  },
});

while (!operation.done) {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  operation = await ai.operations.getVideosOperation({
    operation: operation,
  });
}

operation.response?.generatedVideos?.forEach(async (generatedVideo, i) => {
  const resp = await fetch(
    `${generatedVideo.video?.uri}&key=${process.env.GOOGLE_GEN_AI_KEY}`,
  );

  const outputDir = join(import.meta.dirname, "../output");
  const outputPath = join(outputDir, `puppy-from-image-${i}.mp4`);
  if (!existsSync(outputDir)) mkdirSync(outputDir);

  const writer = createWriteStream(outputPath);
  Readable.fromWeb(resp.body).pipe(writer);
});
