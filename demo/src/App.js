import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth';

function App() {
  const isLoggedIn = localStorage.getItem("currentUser") !== null;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route 
            path="/auth" 
            element={isLoggedIn ? <Navigate to="/" replace /> : <Auth />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
