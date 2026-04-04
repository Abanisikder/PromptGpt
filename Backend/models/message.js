import mongoose from "mongoose"
const MessageSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["user","system"],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})
const Message = mongoose.model("Message", MessageSchema);

export default Message;