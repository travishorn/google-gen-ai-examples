import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import {
  getCalendarEventsFunctionDeclaration,
  getCalendarEvents,
} from "../lib/getCalendarEvents.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const config = {
  tools: [
    {
      functionDeclarations: [getCalendarEventsFunctionDeclaration],
    },
  ],
};

const contents = [
  {
    role: "user",
    parts: [
      {
        text: "Do I have any events coming up on my calendar between 2025-05-10 and 2025-05-11?",
      },
    ],
  },
];

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents,
  config,
});

const toolCall = response.functionCalls[0];

let result;
if (toolCall.name === "getCalendarEvents") {
  result = getCalendarEvents(toolCall.args.startDate, toolCall.args.endDate);
}

const functionResponsePart = {
  name: toolCall.name,
  response: { result },
};

contents.push({ role: "model", parts: [{ functionCall: toolCall }] });
contents.push({
  role: "user",
  parts: [{ functionResponse: functionResponsePart }],
});

const finalResponse = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents,
  config,
});

console.log(finalResponse.text);
