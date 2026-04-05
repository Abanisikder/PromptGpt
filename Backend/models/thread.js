import mongoose from "mongoose";
import Message from "./message.js"; 

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
    
    messages: [Message.schema], 
    
}, { timestamps: true });

const Thread = mongoose.model("Thread", ThreadSchema);
export default Thread;