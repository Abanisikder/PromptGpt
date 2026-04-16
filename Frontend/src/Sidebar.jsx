

import React, { useContext, useEffect } from 'react';
import "./Sidebar.css";
import logo from "./assets/promptgpt.png";
import { MyContext } from './MyContext';

function Sidebar() {

  const { allThread, setAllThread, currThread } = useContext(MyContext);

  const getAllThread = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      if (!response.ok) throw new Error("Network response was not ok");
      
      const res = await response.json();
      
     
      const filterData = res.map(thread => ({
        threadId: thread.threadId,
        title: thread.title
      }));
      
      console.log("Filtered Data:", filterData);
      
     
      setAllThread(filterData);
      
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    getAllThread();
    
  }, [currThread]);

  return (
    <section className='sidebar'>
      <button>
        <img src={logo} alt="promptgpt logo" className='logo' />
        <span> <i className="fa-regular fa-pen-to-square"></i></span>
      </button>

      <div className='history'>
        <ul>
          {}
          {Array.isArray(allThread) && allThread.length > 0 ? (
            allThread.map((thread) => (
              <li key={thread.threadId || thread._id}>
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