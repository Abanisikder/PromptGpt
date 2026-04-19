
import React, { useContext, useState, useEffect } from "react";
import "./Chatwindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { ClipLoader } from 'react-spinners';

function Chatwindow() {
  const [loading, setLoading] = useState(false);
  const { 
    prompt, 
    setPrompt, 
    reply, 
    setReply, 
    currThread, 
    preChat, 
    setPreChat, 
    setNewChat 
  } = useContext(MyContext);

  const getReply = async () => {
    if (!prompt.trim()) return; // Prevent empty sends

    setLoading(true);
    setNewChat(false); // Ensure we are in "chat mode" 
    
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
      const res = await response.json();
      setReply(res.reply);
    } catch (err) {
      console.log("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Syncs new messages to the history view
  useEffect(() => {
    if (prompt && reply) {
      setPreChat(prev => ([...prev, 
        { role: "user", content: prompt },
        { role: "system", content: reply }
      ]));
      setPrompt(""); // Clear input after successful exchange
      setReply(null); // Reset reply state for the next turn
    }
  }, [reply]);

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
      
      {/* The Chat component displays the contents of 'preChat' */}
      <Chat /> 
      
      <div className="loading-container">
        <ClipLoader loading={loading} color="white"/>
      </div>

      <div className="inputbox">
        <div className="box">
          <input
            placeholder="Enter your Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getReply()}
          />
          <span className="btn" id="submit" onClick={getReply}>
           <i className="fa-regular fa-paper-plane"></i>
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
