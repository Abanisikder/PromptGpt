
import React, { useContext, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import "./Chat.css";
import ReactMarkdown from "react-markdown";
import RehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, preChat } = useContext(MyContext);
  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}
      <div className="chats">

        {preChat?.map((Chat, idx) => (
          <div className={Chat.role==="user"?"userdiv":"gptdiv"} key={idx}>
            {
              Chat.role==="user"?
              <p className="usermessage">{Chat.content}</p>:
              // <p className="gptmessage">{Chat.content}</p>
              <ReactMarkdown rehypePlugins={RehypeHighlight}>{Chat.content}</ReactMarkdown>
            }

          </div>
        ))}
        {/* <div className="userdiv">
          <p className="usermessage">user message</p>
        </div>
        <div className="gptdiv">
          <p className="gptmessage">promptgpt message</p>
        </div> */}
      </div>
    </>
  );
}

export default Chat;
