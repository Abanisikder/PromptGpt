import React from "react";
import "./Chatwindow.css";
import Chat from "./Chat.jsx"

function Chatwindow() {
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
      <Chat/>
      <div className="inputbox">
        <div className="box">
          <input placeholder="Enter your Prompt"></input>
        <span className="btn"><i class="fa-brands fa-rev"></i></span>
        </div>
        <div className="info">
          <p>PromptGpt can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
}

export default Chatwindow;
