import { useState } from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignUp from './Signup';
import Home from './home';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path='/auth' element= {<SignUp/>}/>
        <Route path = '/home' element= {<Home/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
