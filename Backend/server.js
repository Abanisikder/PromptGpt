const express = require('express');
const Groq = require("groq-sdk");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // ফ্রন্টএন্ড থেকে রিকোয়েস্ট আসার জন্য জরুরি

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// এআই চ্যাটের জন্য মেইন রাউট
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body; // ফ্রন্টএন্ড থেকে আসা মেসেজ

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful coding assistant."
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.1-8b-instant",
        });

        const reply = chatCompletion.choices[0]?.message?.content;
        res.json({ reply }); // ফ্রন্টএন্ডে উত্তর পাঠানো

    } catch (error) {
        console.error("Groq Error:", error.message);
        res.status(500).json({ error: "Something went wrong with the AI." });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});