import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const chat = ai.chats.create({
  model: "gemini-2.0-flash",
  history: [
    {
      role: "user",
      parts: [{ text: "Hello!" }],
    },
    {
      role: "model",
      parts: [{ text: "Hi, how can I help you today?" }],
    },
  ],
});

const stream1 = await chat.sendMessageStream({
  message: "Should I have a sandwich or a salad for lunch?",
});

for await (const chunk of stream1) {
  console.log(chunk.text);
}

const stream2 = await chat.sendMessageStream({
  message: "Which option is healthier?",
});

for await (const chunk of stream2) {
  console.log(chunk.text);
}
