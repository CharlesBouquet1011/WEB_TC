import { useState } from 'react';

import { Header } from "./components/Header.js"
import { Vehicule } from './components/Vehicule.js';
import { Location } from './components/Location.js';

export function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>

      {/* Vehicles Management */}
      {activeTab===0 && (
        <Vehicule/>
      )}

      {/* Location Management */}
      {activeTab===1 && (
        <Location/>
      )}
    </div>
  );
}
