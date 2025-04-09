import { useState } from 'react';

import { Login } from './components/Login.js';
import { Header } from "./components/Header.js"
import { Vehicule } from './components/Vehicule.js';
import { Location } from './components/Location.js';
import { Client } from './components/Client.js';

export function Admin() {
  const [login, setLogin] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleLogin = (password) => {
    if (password === "de/admin-password") {
      setLogin(true);
      return true;
    } else {
      return false;
    }
  };
  
  if (login) {
    return (
      <div>
        <Header activeTab={activeTab} setActiveTab={setActiveTab}/>

          {/* Vehicles Management */}
          {activeTab===0 && (
            <Vehicule/>
          )}

        {/* Locations Management */}
        {activeTab===1 && (
          <Location/>
        )}

        {/* Clients Management */}
        {activeTab===2 && (
          <Client/>
        )}
      </div>
    );
  }
  else {
    return(<Login onLogin={handleLogin}/>)
  }
}
