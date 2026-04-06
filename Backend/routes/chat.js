import express from "express"
import Thread from "../models/thread.js";
import { getGroqResponse } from "../utils/openAi.js";

const router = express.Router();

router.post('/test', async (req, res) => {
    try {
        const thread = new Thread({
            threadId: 123,
            title: 'how i can earn money',
        });
        const response = await thread.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'failed to connected with db' });
    }
});
router.get("/thread",async(req,res)=>{
    try{
        const threads=await Thread.find({}).sort({ createdAt: -1 });
        res.json(threads);
    }catch(err){
         console.log(err);
        res.status(500).json({ error: 'failed to connected with db' });

    }
})
router.get("/thread/:threadId",async(req,res)=>{
    const{threadId}=req.params;
    try{
        const thread=await Thread.findOne({threadId});
       
        if(!thread)
        {
          return  res.status(404).json({ error: 'page is not found' });

        }
        res.json(thread.messages);


    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'something went wrong' });

    }
})
router.delete("/thread/:threadId",async(req,res)=>{
     const{threadId}=req.params;

    try{
        const deleteChat=await Thread.findOneAndDelete({threadId});
        if(!deleteChat)
        {
            return res.status(404).json({ error: 'page is not found' });
        }
        res.status(200).json({success:"the chat is deleted successfuly"});

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'something went wrong' });

    }
})
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;
    if (!threadId || !message) {
        return res.status(400).json({ error: 'missing the requirement' });
    }

    try {
        let thread = await Thread.findOne({ threadId });
        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }],
            });
        } else {
            thread.messages.push({ role: "user", content: message });
        }
        const assistantReply = await getGroqResponse(message);
        thread.messages.push({ role: "system", content: assistantReply });

        const response = await thread.save();
        res.json({ reply: assistantReply });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'something went wrong' });
    }
})

export default router;