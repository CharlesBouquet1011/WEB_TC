import { useState } from 'react';

import { Header } from "./components/Header.js"
import { Vehicule } from './components/Vehicule.js';
import { Location } from './components/Location.js';
import { Client } from './components/Client.js';

export function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  
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
