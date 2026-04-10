
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
  const providerValues={
    prompt,setPrompt,reply,setReply,currThread,setCurrThread
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
