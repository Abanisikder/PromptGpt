import express from 'express';
import Groq from 'groq-sdk';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose'; 
import chatRoutes from "./routes/chat.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api",chatRoutes);

// const groq = new Groq({
//     apiKey: process.env.GROQ_API_KEY,
// });


// app.post('/api/chat', async (req, res) => {
//     try {
//         const { message } = req.body;

//         const chatCompletion = await groq.chat.completions.create({
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are a helpful coding assistant."
//                 },
//                 {
//                     role: "user",
//                     content: message,
//                 },
//             ],
//             model: "llama-3.1-8b-instant",
//         });

//         const reply = chatCompletion.choices[0]?.message?.content;
//         res.json({ reply });

//     } catch (error) {
//         console.error("Groq Error:", error.message);
//         res.status(500).json({ error: "Something went wrong with the AI." });
//     }
// });
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database is connected successfully");
    }
    catch(err){
        console.log("fail to connect with database",err);
    }
}

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    connectDB();
});