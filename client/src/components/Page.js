import React, { Component, useEffect, useState } from 'react'
import Navbar from "./Navbar";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Parser } from 'html-to-react'
import Moment from 'react-moment';
// import { Audio } from 'react-loader-spinner'
import Loader from "react-js-loader";
const Page = () => {


 const [loading, setloading] = useState(false);
 const [pages, setpages] = useState([])
 const [error, seterror] = useState('');
 const wordpressurl = "http://localhost/react_wordpress/";
 const [show, setshow] = useState(false)
 const navigate =useNavigate();
 useEffect(() => {

setloading(true);
getpages();
if(localStorage.getItem("token"))
{
 setshow(true);
}
 }, [])


 const getpages = () =>{
  axios.get(`${wordpressurl}/wp-json/wp/v2/pages`).then((response)=>{
    console.log(response.data)
    setpages(response.data)
    setloading(false);
    }).catch((error)=>{
      seterror(error.message);
     
      setloading(false);
     
    })
 }

 const deletepage = (id) =>{
  const authToken = localStorage.getItem( 'token' );
  axios.delete(`${wordpressurl}/wp-json/wp/v2/pages/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ authToken }`
    }
  }).then((response)=>{
    console.log(response.data)
    getpages();
    }).catch((error)=>{
      seterror(error.message);
     
      setloading(false);
     
    })
 }
  return (
    <div>
    <Navbar/>
  
    { error && <div className="alert alert-danger"> {error}</div>}
{pages.length ?   
 <div className="mt-5 pages-container">
      {pages.map(page=>(
 <div className="card border-dark mb-3" key={page.id} style={{maxWidth: '50rem'}}>
 <div className="card-header">
   <Link to={`/page/${pages.id}`} className="text-secondary font-weight-bold" style={{ textDecoration: 'none' }}>
   {page.title.rendered}
   </Link>
 </div>
 <div className="card-body">
   <div className="card-text page-content">{Parser().parse(page.excerpt.rendered)}</div>
 </div>
 <div className="card-footer">
 <Moment fromNow >{page.date}</Moment>
 <br></br>
 {show && <><Link to={`/dashboard/page/${page.id}`} className="btn btn-secondary float-right" style={{ textDecoration: 'none' }}>
										Read More...
									</Link>

                  <Link to={`/dashboard/updatepage/${page.id}`} className="btn btn-secondary float-right" style={{ textDecoration: 'none' }}>
									Update Page
									</Link>

                  <button className="btn btn-secondary float-right" style={{ textDecoration: 'none' }} onClick={()=>deletepage(page.id)}>
									Delete Page
									</button></>}
 </div>
</div>

      ))}
     
    
  </div> :"No page"}
 {loading && <Loader type="bubble-loop" bgColor="rgb(0, 0, 0)" color="rgb(0, 0, 0)"  size={100} />}
  </div>
  )
}

export default Page
