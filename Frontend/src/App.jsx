
import './App.css'
import Sidebar from './sidebar'
import Chatwindow from './Chatwindow'
import { MyContext } from './MyContext'
import { useState } from 'react'
import { v1 as uuidv1 } from 'uuid';


function App() {
  const[prompt,setPrompt]=useState("");
  const[reply,setReply]=useState(null);
  const[currThread,setCurrThread]=useState(uuidv1());
  const[preChat,setPreChat]=useState([]);
  const[newChat,setNewChat]=useState(true);
  const[allThread,setAllThread]=useState([]);
  const providerValues={
    prompt,setPrompt,reply,setReply,currThread,setCurrThread,preChat,setPreChat,newChat,setNewChat,allThread,setAllThread
  };
  

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
    <Sidebar/>
    <Chatwindow/>
    </MyContext.Provider>
      
    </div>
  )
}

export default App
