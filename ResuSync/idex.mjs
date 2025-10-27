import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:"AIzaSyDL_QU_eJH8L023ox9E6KYbtp_YCUHNwJ0",});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();
