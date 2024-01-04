import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';

import WrapperCard from './WrapperCard';


function Postmedia() {
  const [ mediafields, setmediafields ] = useState({
		title: '',
			content: '',
			postCreated: false,
			loading: false,
			message: '',
	});
   
    const imgUpload = useRef(null);
const [img, setImg] = useState('');
const [nonce, setnonce] = useState('');
const [tokenkey, settokenkey] = useState('');
  const handleInputChange = (e)=>{
    setmediafields({...mediafields,[e.target.name]:e.target.value})
  }
  const authToken = localStorage.getItem( 'token' );
  function previewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(imgUpload.current.files[0]);
    
    oFReader.onload = function (oFREvent) {
      setImg(oFREvent.target.result);
    };
  };
  const handleFormSubmit = (e)=>{
    const {title,content}=mediafields;
    const userName = localStorage.getItem( 'token' );

    e.preventDefault();
    const siteUrl ="http://localhost/react_wordpress";
    setmediafields({...mediafields,loading:true})
    const formdata = {
      title:title,
      file:img,
      status: 'publish'
    }
    let file = imgUpload.current.files[0];
    const auth = localStorage.getItem( 'userName' );

    const username = 'admin';
    const appPassword = 'pzHBHQ5AoT4zDGfwQ4BPBdk9';
    const mode ='cors';
    var formData = new FormData();
    formData.append( 'file', file );

       console.log(file);
       const authToken = localStorage.getItem( 'token' );
    axios.post(`${siteUrl}/wp-json/wp/v2/media`,formData,
    // {
    //     'Content-Type': 'multipart/form-data',
    //     // Add any necessary authorization headers here if required
    //     // Authorization:`Basic ${btoa(`${username}:${appPassword}`)}`,
    //     Authorization:`Basic ${btoa(`${username}:${appPassword}`)}`,
    //     'Content-Disposition':'form-data; filename=\''+file.name+'\'',
    //    'X-WP-Nonce':nonce
    //   }
    
    {
			headers: {
				'Content-Type': file.type,
				'Authorization': `Bearer ${ authToken }`,
        'Content-Disposition':'form-data; filename=\''+file.name+'\'',
			}}).then((respose)=>{
      console.log(respose.data)
    }).catch((err)=>{
      console.log(err.response.data)
    })
    
  }


  useEffect(() => {
    async function fetchNonce() {
        try {
        
            const siteUrl ="http://localhost/react_wordpress";
     
         const response = await fetch(`${siteUrl}/wp-json/custom/v1/nonce`);
            const data = await response.json();
            setnonce(data);
            console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    fetchNonce();
    
  }, []);
  
  return (
    <div>
      <Navbar/>
      <form onSubmit={ handleFormSubmit } className="mt-5" style={{ maxWidth: '800px' }} encType="multipart/form-data">
					<legend className="mb-4">Create Post</legend>

				

	
					<div className="form-group">
						<label htmlFor="title">Title</label>
						
					</div>

			
					<div className="form-group">
                    <input type="text" name="title" className="form-control" id="title" value={img ?imgUpload.current.files[0].name:""} readOnly/>
                    <input id="imgUpload" type="file" ref={imgUpload} onChange={previewImage}/>
                    </div>
                    <div  className="form-group">
                    <WrapperCard> {(()=>{
              if(img){
                return (<img src={img} alt='image' />)
              }
            })()}</WrapperCard>
                   
					</div>
                   
				
					<button type="submit" className="btn btn-secondary" >Submit</button>
		
				</form>
    </div>
  )
}

export default Postmedia
