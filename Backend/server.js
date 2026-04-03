const Groq = require("groq-sdk");
require('dotenv').config();

// Groq ক্লায়েন্ট সেটআপ
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // নিশ্চিত হোন .env এ এই নামেই আছে
});

async function testGroqConnection() {
    console.log("Connecting to Groq Cloud...");

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Is your API working? Answer in one short sentence.",
                },
            ],
            // Llama 3.1 বর্তমানে খুব ভালো কাজ করে
            model: "llama-3.1-8b-instant",
        });

        // আউটপুট প্রিন্ট করা
        const responseText = chatCompletion.choices[0]?.message?.content;
        console.log("------------------------------");
        console.log("Groq says:", responseText);
        console.log("------------------------------");
        console.log("Success! Your API is working perfectly.");

    } catch (error) {
        console.error("Groq Error:", error.message);
        if (error.message.includes("401")) {
            console.log("Tip: Your API Key might be wrong. Check your .env file.");
        }
    }
}

// ফাংশনটি রান করা
testGroqConnection();