import React, { Component,useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar(){

  const [show, setshow] = useState(false)
const navigate =useNavigate();
useEffect(() => {
 if(localStorage.getItem("token"))
 {
  setshow(true);
 }
}, [])

const logoutevent = () =>{
  localStorage.clear();
navigate("/login")
}   

return (
      <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home
           
          </Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link " to="/login">Login
           
           </Link>
        </li>
{show &&<><li className="nav-item">
        <Link className="nav-link " to="/dashboard/page">Pages
           
           </Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link " to="/dashboard/create-post">CreatePost
           
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/dashboard/create-page">CreatePage
           
          </Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link " to="/dashboard/media">Media
           
           </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/dashboard/mediapost">Media Post
           
          </Link>
        </li>
      
         <li className="nav-item">
         <span className="nav-link" onClick={logoutevent}>Logout
            
            </span>
         </li>
         </> 
        
        }
        
      </ul>
    </div>
  </div>
</nav>
      </div>
    )

}

export default Navbar;