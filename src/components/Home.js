import React, { Component, useEffect, useState } from 'react'
import Navbar from "./Navbar";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Parser } from 'html-to-react'
import Moment from 'react-moment';
// import { Audio } from 'react-loader-spinner'
import Loader from "react-js-loader";
const Home = () => {


 const [loading, setloading] = useState(false);
 const [posts, setposts] = useState([])
 const [error, seterror] = useState('');
 const wordpressurl = "http://localhost/react_wordpress/";
 const [show, setshow] = useState(false)
 const navigate =useNavigate();
 useEffect(() => {

setloading(true);
getposts();
if(localStorage.getItem("token"))
{
 setshow(true);
}
 }, [])


 
 const deletepost = (id) =>{
  const authToken = localStorage.getItem( 'token' );
  axios.delete(`${wordpressurl}/wp-json/wp/v2/posts/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ authToken }`
    }
  }).then((response)=>{
    console.log(response.data)
    getposts();
    }).catch((error)=>{
      seterror(error.message);
     
      setloading(false);
     
    })
 }
 const getposts = () =>{
  axios.get(`${wordpressurl}/wp-json/wp/v2/posts`).then((response)=>{
    console.log(response.data)
    setposts(response.data)
    setloading(false);
    }).catch((error)=>{
      seterror(error.message);
     
      setloading(false);
     
    })
 }
  return (
    <div>
    <Navbar/>
  
    { error && <div className="alert alert-danger"> {error}</div>}
{posts.length ?   
 <div className="mt-5 posts-container">
      {posts.map(post=>(
 <div className="card border-dark mb-3" key={post.id} style={{maxWidth: '50rem'}}>
 <div className="card-header">
   <Link to={`/post/${post.id}`} className="text-secondary font-weight-bold" style={{ textDecoration: 'none' }}>
   {post.title.rendered}
   </Link>
 </div>
 <div className="card-body">
   <div className="card-text post-content">{Parser().parse(post.excerpt.rendered)}</div>
 </div>
 <div className="card-footer">
 <Moment fromNow >{post.date}</Moment>
 <br></br>
 {show && <><Link to={`/dashboard/post/${post.id}`} className="btn btn-secondary float-right" style={{ textDecoration: 'none' }}>
										Read More...
									</Link>
                  <Link to={`/dashboard/updatepost/${post.id}`} className="btn btn-secondary float-right" style={{ textDecoration: 'none' }}>
									Update Post
									</Link>

                  <button className="btn btn-secondary float-right" style={{ textDecoration: 'none' }} onClick={()=>deletepost(post.id)}>
									Delete Post
									</button></>}
 </div>
</div>

      ))}
     
    
  </div> :"No Post"}
 {loading && <Loader type="bubble-loop" bgColor="rgb(0, 0, 0)" color="rgb(0, 0, 0)"  size={100} />}
  </div>
  )
}

export default Home
