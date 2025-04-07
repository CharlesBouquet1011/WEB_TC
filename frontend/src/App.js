
import './App.css';
import React, { useState, useEffect } from 'react';
import { CSRFProvider } from './Contexts/CsrfContext.js';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx"
import Login from './security/login.jsx';
import Cars from './Cars/Cars.jsx';
import { AuthProvider } from './Contexts/Authenticated.js';
import User from './pages/User.jsx';
import Registration from './security/registration.jsx';
import { Admin } from "./Admin/Admin.js"
import { VarProvider } from './Contexts/VariablesGlobales.js';
import Assistance from './Locations/Assistance.jsx';
import Reservation from './Reservation/reservation.jsx';
import Services from './pages/Services.jsx';
import { ChangePasswordForm } from './security/changePassword.jsx';
import Confirmation from './Reservation/confirmation.jsx'
import ModifyBooking from './Locations/modifyBooking.jsx';
import DeleteBooking from './Locations/DeleteBooking.jsx';

function App() {

  return (
    <VarProvider>
      <CSRFProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
                <Route path="/user/changePassword" element={<ChangePasswordForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route exact path="/cars" element={<Cars />} />
                <Route exact path="/cars/location" element={<Reservation />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Assistance />} />
              <Route path="/services" element={<Services />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/bookings/modify" element={<ModifyBooking />} />
              <Route path="/bookings/delete" element={<DeleteBooking />} />
            </Routes>
          </Router>
        </AuthProvider>
      </CSRFProvider>
    </VarProvider>
  );
}

export default App;
