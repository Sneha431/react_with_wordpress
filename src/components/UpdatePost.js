import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdatePost() {
    const { id } = useParams()
    const [pages, setpages] = useState([])
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);
  const [ postfields, setpostfields ] = useState({
		
			postCreated: false,
			loading: false,
			message: '',
	});

const [title, settitle] = useState("");
const [content, setcontent] = useState("");
    const getposts = () =>{
        const siteUrl ="http://localhost/react_wordpress";
        axios.get(`${siteUrl}/wp-json/wp/v2/posts/${id}`).then((response)=>{
        
        
         
         
         settitle(response.data.title.rendered)
         setcontent(response.data.content.rendered)
        
          setloading(false);
          }).catch((error)=>{
            seterror(error.message);
           
            setloading(false);
           
          })
       }
//   const handleInputChange = (e)=>{
//     // setpostfields({...postfields,[e.target.name]:e.target.value})

//     settitle(e.target.value)
//     setcontent(e.target.value)
//   }
  const handleFormSubmit = (e)=>{

    const authToken = localStorage.getItem( 'token' );
console.log(id)
    e.preventDefault();
    const siteUrl ="http://localhost/react_wordpress";
    setpostfields({...postfields,loading:true})
    const formdata = {
      title,
      content,
      status: 'publish'
    }
    axios.post(`${siteUrl}/wp-json/wp/v2/posts/${id}`,formdata,
    {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ authToken }`
			}
		}).then((respose)=>{
      
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }

  useEffect(() => {
    

    getposts();
  }, [])
  
  return (
    <div>
      <Navbar/>
  
      <form onSubmit={ handleFormSubmit } className="mt-5" style={{ maxWidth: '800px' }}>
					<legend className="mb-4">Update Post</legend>

				

	
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input type="text" name="title" onChange={(e)=>settitle(e.target.value)} className="form-control" id="title" value={title}/>
					</div>

			
					<div className="form-group">
						<label htmlFor="my-post-content">Content</label>
						<textarea name="content" className="form-control" id="my-post-content" onChange={(e)=>setcontent(e.target.value)} rows="10" value={content}/>
					</div>

				
					<button type="submit" className="btn btn-secondary">Submit</button>
		
				</form>
    </div>
  )
}

export default UpdatePost
