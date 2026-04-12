



import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import "./Chat.css";
import ReactMarkdown from "react-markdown";
import RehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";


const Typewriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <ReactMarkdown rehypePlugins={[RehypeHighlight]}>{currentText}</ReactMarkdown>;
};

function Chat() {
  const { newChat, preChat } = useContext(MyContext);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}
      <div className="chats">
        {preChat?.map((chat, idx) => (
          <div className={chat.role === "user" ? "userdiv" : "gptdiv"} key={idx}>
            {chat.role === "user" ? (
              <p className="usermessage">{chat.content}</p>
            ) : (
             
              idx === preChat.length - 1 ? (
                <Typewriter text={chat.content} delay={20} />
              ) : (
                <ReactMarkdown rehypePlugins={[RehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Chat;