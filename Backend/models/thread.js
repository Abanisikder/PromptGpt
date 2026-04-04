import mongoose from "mongoose";
import Message from "./message.js"; // আপনার Message মডেলটি ইম্পোর্ট করুন

const ThreadSchema = new mongoose.Schema({
    threadId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        default: "New chat",
    },
    // সরাসরি Message মডেলের schema ব্যবহার করা হচ্ছে
    messages: [Message.schema], 
    
}, { timestamps: true });

const Thread = mongoose.model("Thread", ThreadSchema);
export default Thread;