import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'

function Dashhboard() {
    const {username} = useParams();
  
  return (
    <div>
   <Navbar/>
   <p>Welcome {username ? username :localStorage.getItem("userName")}</p>
 
    </div>
  )
}

export default Dashhboard
