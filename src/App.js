import React from 'react'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singlepost from './components/Singlepost';
import "./style.css";
import Login from './components/Login';
import Dashhboard from './components/Dashhboard';
import CreatePost from './components/CreatePost';
import CreatePage from './components/CreatePage';
import Page from './components/Page';
import Singlepage from './components/SinglePage';
import UpdatePage from './components/UpdatePage';
import UpdatePost from './components/UpdatePost';



export default function App() {
  return (
	<div>
	 
	  <BrowserRouter>
	
      <Routes>
        <Route path="/" element={  <Home/>}/>
		<Route path="/dashboard/post/:id" element={  <Singlepost  />}/>
    <Route path="/dashboard/page" element={  <Page/>}/>
    <Route path="/dashboard/page/:id" element={  <Singlepage  />}/>
    <Route path="/dashboard/updatepage/:id" element={  <UpdatePage  />}/>
    <Route path="/login" element={  <Login/>}/>
    <Route path="/dashboard/:username" element={  <Dashhboard/>}/>
   
    <Route path="/dashboard/create-post" element={  <CreatePost/>}/>
    <Route path="/dashboard/updatepost/:id" element={  <UpdatePost  />}/>
    <Route path="/dashboard/create-page" element={  <CreatePage/>}/>
      </Routes>
    </BrowserRouter>
	</div>
  )
}
