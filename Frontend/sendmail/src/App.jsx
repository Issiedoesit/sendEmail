import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Posts from './Posts'
import SendMail from './sendMail'


function App() {

      

  return (

    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<SendMail />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </div>
  )
}

export default App
