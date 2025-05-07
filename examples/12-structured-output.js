import "dotenv/config";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: "List rare earth metals.",
  config: {
    responseMimeType: "application/json",
    // More about responseSchema: https://ai.google.dev/gemini-api/docs/structured-output?lang=node#json-schemas
    responseSchema: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          metal: {
            type: Type.STRING,
            description: "Name of the metal",
            nullable: false,
          },
        },
        required: ["metal"],
      },
    },
  },
});

console.debug(response.text);
