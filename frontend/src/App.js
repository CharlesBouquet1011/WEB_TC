
import './App.css';
import ItemsList from './ItemList.jsx';
import React, { useState, useEffect } from 'react';

import { CSRFProvider } from './Contexts/CsrfContext.js';
import SeeBookings from "./Locations/seeBookings.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router";
import UserLogged from './pages/userLogged.jsx';
import Home from "./pages/Home.jsx"
import Login from './security/login.jsx';
function App() {
  
  
  return (
    <CSRFProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserLogged />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
      
    </CSRFProvider>
  );
}

export default App;
