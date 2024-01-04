import React, { Component, useEffect, useState } from 'react'
import Navbar from "./Navbar";
import axios from 'axios';
import {useParams } from 'react-router-dom';
import { Parser } from 'html-to-react'
import Moment from 'react-moment';
// import { Audio } from 'react-loader-spinner'
import Loader from "react-js-loader";
const Singlepost = () => {


 const [loading, setloading] = useState(false);
 const [posts, setposts] = useState([])
 const [error, seterror] = useState('');
 const wordpressurl = "http://localhost/react_wordpress/";
 const { id } = useParams()
 useEffect(() => {

setloading(true);
getposts();

 }, [])

 const getposts = () =>{
  axios.get(`${wordpressurl}/wp-json/wp/v2/posts/${id}`).then((response)=>{
    console.log(response.data)
    setposts(response.data)
    setloading(false);
    console.log(Object.keys(posts));
    }).catch((error)=>{
      seterror(error.message);
     
      setloading(false);
     
    })
 }
  return (
    <div>
    <Navbar/>
  
    { error && <div className="alert alert-danger"> {error}</div>}

{Object.keys(posts).length ?  
 <div className="mt-5 posts-container">

 <div className="card border-dark mb-3" key={posts.id} style={{maxWidth: '50rem'}}>
 <div className="card-header">
  
   {posts && posts.title.rendered}
  
 </div>
 <div className="card-body">
   <div className="card-text post-content">{Parser().parse(posts && posts.excerpt.rendered)}</div>
 </div>
 <div className="card-footer">
 <Moment fromNow >{posts.date}</Moment>
 <br></br>
 
 </div>
</div>

    
     
    
  </div>:"No Post"}
 {loading && <Loader type="bubble-loop" bgColor="rgb(0, 0, 0)" color="rgb(0, 0, 0)"  size={100} />}
  </div>
  )
}

export default Singlepost
