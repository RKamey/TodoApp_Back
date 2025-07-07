import { envs } from "@config/envs";
import { groqClient } from "@config/groqClient";

const askChatbot = async (message: string): Promise<string | null> => {
  const response = await groqClient.chat.completions.create({
    model: envs.GROQ_MODEL,
    messages: [{ role: "user", content: message }],
  });

  return response.choices[0].message.content;
};

export const chatbotService = { askChatbot };
