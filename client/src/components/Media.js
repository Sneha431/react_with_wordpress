import React, { Component, useEffect, useState } from 'react'
import Navbar from "./Navbar";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Parser } from 'html-to-react'
import Moment from 'react-moment';
// import { Audio } from 'react-loader-spinner'
import Loader from "react-js-loader";
const Media = () => {


 const [loading, setloading] = useState(false);
 const [media, setmedia] = useState([])
 const [error, seterror] = useState('');
 const wordpressurl = "http://localhost/react_wordpress/";
 const [show, setshow] = useState(false)
 const navigate =useNavigate();
 useEffect(() => {

setloading(true);
getmedia();
if(localStorage.getItem("token"))
{
 setshow(true);
}
 }, [])


 const getmedia = () =>{
  axios.get(`${wordpressurl}/wp-json/wp/v2/media`).then((response)=>{
    console.log(response.data)
   setmedia(response.data)
    setloading(false);
    }).catch((error)=>{
      seterror(error.message);
     
      setloading(false);
     
    })
 }

 const deletemedia = (id) =>{
  const authToken = localStorage.getItem( 'token' );
  axios.delete(`${wordpressurl}/wp-json/wp/v2/media/${id}?force=true`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ authToken }`
    }
  }).then((response)=>{
    console.log(response.data)
    getmedia();
    }).catch((error)=>{
      seterror(error.message);
     
      setloading(false);
     
    })
 }
  return (
    <div>
    <Navbar/>
  
    { error && <div className="alert alert-danger"> {error}</div>}
{media.length ?   
 <div className="mt-5 media-container">
      {media.map(media=>(
 <div className="card border-dark mb-3" key={media.id} style={{maxWidth: '50rem'}}>
 <div className="card-header">
   <Link to={`/media/${media.id}`} className="text-secondary font-weight-bold" style={{ textDecoration: 'none' }}>
   {media.title.rendered}
   </Link>
 </div>
 <div className="card-body">
   <div className="card-text media-content">{Parser().parse(media.description.rendered)}</div>
 </div>
 <div className="card-footer">
 <Moment fromNow >{media.date}</Moment>
 <br></br>
 {show && <>

                  <button className="btn btn-secondary float-right" style={{ textDecoration: 'none' }} onClick={()=>deletemedia(media.id)}>
									Delete media
									</button></>}
 </div>
</div>

      ))}
     
    
  </div> :"No media"}
 {loading && <Loader type="bubble-loop" bgColor="rgb(0, 0, 0)" color="rgb(0, 0, 0)"  size={100} />}
  </div>
  )
}

export default Media
