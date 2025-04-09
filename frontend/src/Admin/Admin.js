import { useState } from 'react';

import { Header } from "./components/Header.js"
import { Vehicule } from './components/Vehicule.js';
<<<<<<< HEAD
import { LocationRow } from './components/LocationRow.js';
import { EditLocation } from './components/EditLocation.js';
import { AddLocation } from './components/AddLocation.js';
import { Login } from './components/Login.js';

const initialLocations = [
  { plate: "FW-245-MD", model: "Bugatti Chiron", startTime: "2025-03-26", endTime: "2025-05-11", userId: "mathis"},
  { plate: "QR-982-ZX", model: "Lamborghini Aventador SVJ", startTime: "2025-02-26", endTime: "2025-06-25", userId: "anais"},
  { plate: "YL-318-WG", model: "Porsche 911 Turbo S", startTime: "2025-04-05", endTime: "2025-04-30", userId: "charles"},
  { plate: "PJ-728-RM", model: "Mercedes-AMG GT Black Series", startTime: "2025-05-12", endTime: "2025-07-26", userId: "paulhenri"}
]

export function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const [editLoc, setEditLoc] = useState(false);
  const [addLocationMode, setAddLocationMode] = useState(false);
  const [locations, setLocations] = useState(initialLocations);

  const [login, setLogin] = useState(true);

  const handleDelete = (plate) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette location ?");
    if (confirmDelete) {
      setLocations(locations.filter(location => location.plate !== plate));
    }
  };

  if (login) {
    return (
      <div>
        <Header activeTab={activeTab} setActiveTab={setActiveTab}/>
=======
import { Location } from './components/Location.js';
import { Client } from './components/Client.js';

export function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>
>>>>>>> 69e611eca73475c5be1d035283d74094d9083c55

        {/* Vehicles Management */}
        {activeTab===0 && (
          <Vehicule/>
        )}

<<<<<<< HEAD
        {/* Location Management */}
        {activeTab === 1 && !editLoc && !addLocationMode && (
          <div className="container mt-4">
            <button type="button" className="btn btn-secondary btn-lg mb-3" onClick={() => setAddLocationMode(true)}>Ajouter une location +</button>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Plaque</th>
                  <th>Modèle</th>
                  <th>Utilisateur</th>
                  <th>Début</th>
                  <th>Fin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <LocationRow key={index} plate={location.plate} model={location.model} startTime={location.startTime} endTime={location.endTime} userId={location.userId} setEditLoc={setEditLoc} handleDelete={handleDelete}/>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Location Page */}
        {activeTab === 1 && addLocationMode && (
          <AddLocation
            setAddLocationMode={setAddLocationMode}
            locations={locations}
            setLocations={setLocations}
          />
        )}

        {/* Edit Location Page*/}
        {activeTab === 1 && editLoc && (
          <EditLocation 
            setEditLoc={setEditLoc} 
            selectedLocation={editLoc}
            locations={locations}
            setLocations={setLocations}
          />
        )}
      </div>
    );
  } else {
    return(
      <Login/>
    )
  }
}
=======
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
>>>>>>> 69e611eca73475c5be1d035283d74094d9083c55
