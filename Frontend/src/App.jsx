
import './App.css'
import Sidebar from './sidebar'
import Chatwindow from './Chatwindow'
import { MyContext } from './MyContext'

function App() {
  const providerValues={};
  

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
