import React, { Component, useEffect, useState } from 'react'
import Navbar from "./Navbar";
import axios from 'axios';
import {useParams } from 'react-router-dom';
import { Parser } from 'html-to-react'
import Moment from 'react-moment';
// import { Audio } from 'react-loader-spinner'
import Loader from "react-js-loader";
const Singlepage = () => {


 const [loading, setloading] = useState(false);
 const [pages, setpages] = useState([])
 const [error, seterror] = useState('');
 const wordpressurl = "http://localhost/react_wordpress/";
 const { id } = useParams()
 useEffect(() => {

setloading(true);
getpages();

 }, [])

 const getpages = () =>{
  axios.get(`${wordpressurl}/wp-json/wp/v2/pages/${id}`).then((response)=>{
    console.log(response.data)
    setpages(response.data)
    setloading(false);
    console.log(Object.keys(pages));
    }).catch((error)=>{
      seterror(error.message);
     
      setloading(false);
     
    })
 }
  return (
    <div>
    <Navbar/>
  
    { error && <div className="alert alert-danger"> {error}</div>}

{Object.keys(pages).length ?  
 <div className="mt-5 pages-container">

 <div className="card border-dark mb-3" key={pages.id} style={{maxWidth: '50rem'}}>
 <div className="card-header">
  
   {pages && pages.title.rendered}
  
 </div>
 <div className="card-body">
   <div className="card-text post-content">{Parser().parse(pages && pages.excerpt.rendered)}</div>
 </div>
 <div className="card-footer">
 <Moment fromNow >{pages.date}</Moment>
 <br></br>
 
 </div>
</div>

    
     
    
  </div>:"No Page"}
 {loading && <Loader type="bubble-loop" bgColor="rgb(0, 0, 0)" color="rgb(0, 0, 0)"  size={100} />}
  </div>
  )
}

export default Singlepage
