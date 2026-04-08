
import React from 'react'
import "./Sidebar.css"
import logo from "./assets/promptgpt.png";

function Sidebar() {
  return (
    <section className='sidebar'>
      <button>
       <img src={logo} alt="promptgpt logo" className='logo' />
       <span> <i className="fa-regular fa-pen-to-square"></i></span>
      </button>
      <div className='history'>
      <ul >
        <li>history 1</li>
        <li>history 2</li>
        <li>history 3</li>
        <li>history 4</li>
      </ul>
      </div>
      <div className='sign'>
        <p>Owner Abani Sikder &hearts;</p>

      </div>


    </section>
  )
}

export default Sidebar