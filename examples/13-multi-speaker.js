import "dotenv/config";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenAI } from "@google/genai";
import { saveWaveFile } from "../lib/saveWaveFile.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const prompt = `TTS the following conversation between Joe and Jane:
         Joe: How's it going today Jane?
         Jane: Not too bad, how about you?`;

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-preview-tts",
  contents: [{ parts: [{ text: prompt }] }],
  config: {
    responseModalities: ["AUDIO"],
    speechConfig: {
      multiSpeakerVoiceConfig: {
        speakerVoiceConfigs: [
          {
            speaker: "Joe",
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Puck" },
            },
          },
          {
            speaker: "Jane",
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" },
            },
          },
        ],
      },
    },
  },
});

const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
const audioBuffer = Buffer.from(data, "base64");

const outputDir = join(import.meta.dirname, "../output");
const outputPath = join(outputDir, "conversation.wav");
if (!existsSync(outputDir)) mkdirSync(outputDir);
await saveWaveFile(outputPath, audioBuffer);

console.log(`Audio saved as ${outputPath}`);
