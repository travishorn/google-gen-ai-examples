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

const response1 = await chat.sendMessage({
  message: "Should I have a sandwich or a salad for lunch?",
});

console.log("Chat response 1:", response1.text);

const response2 = await chat.sendMessage({
  message: "Which option is healthier?",
});

console.log("Chat response 2:", response2.text);
