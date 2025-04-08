import axios from "axios";

const GROK_LLAMA_KEY = process.env.GROK_LLAMA_KEY;
const GROK_MODEL = process.env.GROK_MODEL;

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await axios.post(
      `https://api.groq.com/openai/v1/chat/completions`,
      {
        "model": GROK_MODEL,
        "messages": [{
            "role": "user",
            "content": text || "Hello, how are you"
        }]
        },
      {
        headers: {
          Authorization: `Bearer ${GROK_LLAMA_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Summarization error:", error);
    // throw new Error(error:error);
    return error;
  }
}
