import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
console.log("Gemini Key:", process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {

    console.log(error);

    throw new Error("AI response failed");

  }
};