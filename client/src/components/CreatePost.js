import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';

function CreatePost() {
  const [ postfields, setpostfields ] = useState({
		title: '',
			content: '',
			postCreated: false,
			loading: false,
			message: '',
	});
  const handleInputChange = (e)=>{
    setpostfields({...postfields,[e.target.name]:e.target.value})
  }
  const handleFormSubmit = (e)=>{
    const {title,content}=postfields;
    const authToken = localStorage.getItem( 'token' );

    e.preventDefault();
    const siteUrl ="http://localhost/react_wordpress";
    setpostfields({...postfields,loading:true})
    const formdata = {
      title,
      content,
      status: 'publish'
    }
    axios.post(`${siteUrl}/wp-json/wp/v2/posts`,formdata,
    {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ authToken }`
			}
		}).then((respose)=>{
      console.log(respose.data)
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }
  return (
    <div>
      <Navbar/>
      <form onSubmit={ handleFormSubmit } className="mt-5" style={{ maxWidth: '800px' }}>
					<legend className="mb-4">Create Post</legend>

				

	
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input type="text" name="title" onChange={handleInputChange } className="form-control" id="title"/>
					</div>

			
					<div className="form-group">
						<label htmlFor="my-post-content">Content</label>
						<textarea name="content" className="form-control" id="my-post-content" onChange={handleInputChange } rows="10"/>
					</div>

				
					<button type="submit" className="btn btn-secondary">Submit</button>
		
				</form>
    </div>
  )
}

export default CreatePost
