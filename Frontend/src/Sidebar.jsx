
import React, { useContext, useEffect } from 'react';
import "./Sidebar.css";
import logo from "./assets/promptgpt.png";
import { MyContext } from './MyContext';
import { v1 as uuidv1 } from 'uuid';

function Sidebar() {
  const { 
    allThread, 
    setAllThread, 
    currThread, 
    setNewChat, 
    setPrompt, 
    setReply, 
    setCurrThread, 
    setPreChat 
  } = useContext(MyContext);

  const getAllThread = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      if (!response.ok) throw new Error("Network response was not ok");
      const res = await response.json();
      
      const filterData = res.map(thread => ({
        threadId: thread.threadId,
        title: thread.title
      }));
      
      setAllThread(filterData);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    getAllThread();
  }, [currThread]);

  // --- NEW FUNCTION: Fetch and Switch to Previous Chat ---
  const handleThreadClick = async (threadId) => {
    try {
      // 1. Fetch the messages for this specific thread
      const response = await fetch(`http://localhost:8080/api/messages/${threadId}`);
      if (!response.ok) throw new Error("Failed to fetch chat history");
      
      const messages = await response.json();

      // 2. Update Context State
      setNewChat(false);          // Hide the "New Chat" welcome screen
      setCurrThread(threadId);    // Set the current ID to the clicked one
      setPreChat(messages);       // Load the messages into your chat display
      setReply(null);             // Clear any pending/streaming reply
      setPrompt("");              // Clear the input field
      
    } catch (err) {
      console.error("Error loading previous chat:", err);
    }
  };

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setPreChat([]);
    setCurrThread(uuidv1());
  };

  return (
    <section className='sidebar'>
      <button onClick={createNewChat}>
        <img src={logo} alt="promptgpt logo" className='logo' />
        <span> <i className="fa-regular fa-pen-to-square"></i></span>
      </button>

      <div className='history'>
        <ul>
          {Array.isArray(allThread) && allThread.length > 0 ? (
            allThread.map((thread) => (
              <li 
                key={thread.threadId} 
                onClick={() => handleThreadClick(thread.threadId)}
                style={{ cursor: 'pointer' }} // Make it look clickable
                className={currThread === thread.threadId ? 'active' : ''} // Optional: highlight active
              >
                {thread.title}
              </li>
            ))
          ) : (
            <li>No history available</li>
          )}
        </ul>
      </div>

      <div className='sign'>
        <p>Owner Abani Sikder &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;