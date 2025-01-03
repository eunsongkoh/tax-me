import type { NextApiRequest, NextApiResponse } from "next";
import { HfInference } from "@huggingface/inference";

const token = process.env.HF_TOKEN;
let startedConvo = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!token) {
      return res
        .status(500)
        .json({ error: "Missing HF_TOKEN in environment variables" });
    }

    const hf = new HfInference(token);
    const { conversation, items } = req.body;
    console.log(conversation);
    const totalItems = [];

    for (const i of items) {
      totalItems.push(i.obj_name);
    }

    const recipePrompt = `Act as if you are a friendly neighbour who is suggesting a recipe based on these current items: ${totalItems.join(
      ", "
    )}. This recipe should be simple since there may be times where the items are difficult to recognize.`;

    try {
      console.log(startedConvo);
      const prompt = startedConvo
        ? conversation
            .filter(
              (msg: { role: string; content: string }) => msg.role === "user"
            )
            .pop().content
        : recipePrompt;

      if (startedConvo == false) startedConvo = true;

      const response = await hf.textGeneration({
        model: "tiiuae/falcon-7b-instruct",
        inputs: prompt,
        parameters: { max_new_tokens: 150 },
      });
      
      const botReply = response.generated_text
        .split("\n")
        .slice(1)
        .join("\n")
        .trim();
      res.status(200).json({ reply: botReply });
    } catch (error) {
      console.error("Error querying Hugging Face:", error);
      res.status(500).json({ error: "Failed to query the model" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
