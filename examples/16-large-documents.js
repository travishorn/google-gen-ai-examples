import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createPartFromUri, GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const pdfPath = join(import.meta.dirname, "../input/f-150-service-manual.pdf");
const pdfBuffer = readFileSync(pdfPath);

const fileBlob = new Blob([pdfBuffer], { type: "application/pdf" });

// Upload to Google
const file = await ai.files.upload({
  file: fileBlob,
  config: {
    displayName: "f-150-service-manual.pdf",
  },
});

// Get the uploaded file
let getFile = await ai.files.get({ name: file.name });

// Wait for the file to be processed
while (getFile.state === "PROCESSING") {
  getFile = await ai.files.get({ name: file.name });

  // Wait 5 seconds and check again
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}

if (file.state === "FAILED") {
  throw new Error("File processing failed.");
}

const contents = ["How do I change the oil in my truck?"];

if (file.uri && file.mimeType) {
  const fileContent = createPartFromUri(file.uri, file.mimeType);
  contents.push(fileContent);
}

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents,
});

console.log(response.text);
