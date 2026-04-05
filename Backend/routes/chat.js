import express from "express"
import Thread from "../models/thread.js";

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

export default router;