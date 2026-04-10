import React, { useContext } from "react";
import "./Chatwindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";

function Chatwindow() {
  const { prompt, setPrompt, reply, setReply, currThread } =
    useContext(MyContext);
  const getReply = async () => {
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
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
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
