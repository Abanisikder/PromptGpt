import Groq from 'groq-sdk';
import 'dotenv/config';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const getGroqResponse = async (userMessage) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful coding assistant."
                },
                {
                    role: "user",
                    content: userMessage,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        return chatCompletion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Groq Utility Error:", error.message);
        throw new Error("Failed to get response from Groq AI");
    }
};