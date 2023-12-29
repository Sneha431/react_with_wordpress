import React from 'react'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singlepost from './components/Singlepost';
import "./style.css";

export default function App() {
  return (
	<div>
	 
	  <BrowserRouter>
	
      <Routes>
        <Route path="/" element={  <Home/>}/>
		<Route path="/post/:id" element={  <Singlepost  />}/>
      
      </Routes>
    </BrowserRouter>
	</div>
  )
}
