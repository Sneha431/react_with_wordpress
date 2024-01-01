import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    // const [username, setusername] = useState("");
    // const [password, setpassword] = useState("");
    // const [usernicename, setusernicename] = useState("");
    // const [usermail, setusermail] = useState("");
    // const [loggedin, setloggedin] = useState(false);
    // const [loading ,setloading] = useState(false);
    // const [error ,seterror] = useState("");
    const [ loginFields, setLoginFields ] = useState({
		username: '',
		password: '',
		userNiceName: '',
		userEmail: '',
		loading: false,
        loggedin:false,
		error: ''
	});
    const navigate = useNavigate();
    const { username, password, userNiceName, error, loading ,loggedin} = loginFields;
  
   const onFormSubmit=(event)=>{
        event.preventDefault();
        const siteUrl ="http://localhost/react_wordpress/";
        const loginData = {
            username,password
        }
        setLoginFields( { ...loginFields, loading: true } );

        axios.post(`${siteUrl}/wp-json/jwt-auth/v1/token`,loginData).then((response)=>{
   
          const { token, user_nicename, user_email } = response.data;
          localStorage.setItem( 'token', token );
				localStorage.setItem( 'userName', user_nicename );
                setLoginFields( {
					...loginFields,
					loading: false,
					token: token,
                    loggedin:true,
					userNiceName: user_nicename,
					userEmail: user_email,
				} )

                const user = userNiceName? userNiceName:localStorage.getItem("userName")
                navigate(`/dashboard/${user}`);
            }).catch((error)=>{
             
             console.log(error.response.data);
              
             
            })
    }
    const  handleOnChange=(event)=>{
        setLoginFields( { ...loginFields, [event.target.name]: event.target.value } );
    }
   useEffect(() => {
    if(loggedin || localStorage.getItem("token"))
    {
        const user = userNiceName? userNiceName:localStorage.getItem("userName")
        navigate(`/dashboard/${user}`);
    }
     
   }, [])
   
  return (
    <>
     <div>
   <Navbar/>

   <form onSubmit={ onFormSubmit } style={{ height: '100vh', maxWidth: '400px', margin: '0 auto' }}>
						<label className="form-group">
							Username:
							<input
								type="text"
								className="form-control"
								name="username"
								value={ username }
								onChange={ handleOnChange }
							/>
						</label>
						<br/>
						<label className="form-group">
							Password:
							<input
								type="password"
								className="form-control"
								name="password"
								value={ password }
								onChange={ handleOnChange }
							/>
						</label>
						<br/>
						<button className="btn btn-primary mb-3" type="submit">Login</button>
						{/* { loading && <img className="loader" src={Loader} alt="Loader"/> } */}
					</form>


    </div>
    </>
   
  )
}

export default Login
