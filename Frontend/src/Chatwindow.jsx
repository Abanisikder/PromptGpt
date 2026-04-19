import React, { useContext ,useState,useEffect} from "react";
import "./Chatwindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { ClipLoader } from 'react-spinners';

function Chatwindow() {
  const [loading, setLoading] = useState(false);
  const { prompt, setPrompt, reply, setReply, currThread ,preChat,setPreChat,setNewChat} =
    useContext(MyContext);
  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThread,
      }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res=await response.json();
      console.log(res.reply);
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(()=>{
    if(prompt&&reply){
      setPreChat(preChat=>([...preChat,{
        role:"user",
        content:prompt,
      },
      {
        role:"system",
        content:reply
      }
    ]))
    }
    setPrompt("");

  },[reply])
  return (
    <div className="chatwindow">
      <div className="navbar">
        <span>
          PromtGpt &nbsp;<i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="user">
          <span className="usericon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat />
      <ClipLoader loading={loading} color="white"/>
      <div className="inputbox">
        <div className="box">
          <input
            placeholder="Enter your Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getReply()}
          ></input>
          <span className="btn" id="submit" onClick={getReply}>
            <i className="fa-brands fa-rev"></i>
          </span>
        </div>
        <div className="info">
          <p>PromptGpt can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
}

export default Chatwindow;
