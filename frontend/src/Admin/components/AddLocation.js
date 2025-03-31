import { useState, useEffect } from "react";
import { useFetchCars } from './useFetchCars';

export function AddLocation({ onAdd, onCancel }) {
  const { cars, loading, error: carsError } = useFetchCars();
  const [voitureReservee, setSelectedPlate] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [user, setUserId] = useState("");
  const [dateDebut, setStartTime] = useState("");
  const [dateFin, setEndTime] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Cars in AddLocation:", cars);
  }, [cars]);

  const handleSubmit = () => {
    if (!dateDebut || !dateFin || !user || !voitureReservee) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    if (new Date(dateFin) <= new Date(dateDebut)) {
      setError("La date de fin doit être postérieure à la date de début.");
      return;
    }

    if (typeof onAdd !== "function") {
      console.error("onAdd is not a function!", onAdd);
      return;
    }

    const newLocation = {
      dateDebut,
      dateFin,
      user,
      voitureReservee: voitureReservee
    };

    onAdd(newLocation);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand">Ajouter une Location</span>
          <button 
            className="btn btn-outline-danger" 
            onClick={() => {
              console.log("Cancel button clicked");
              onCancel();
            }} 
            type="button"
          >
            Retour
          </button>
        </div>
      </nav>

      {error && (
        <div className="alert alert-danger container mt-2">
          {error}
        </div>
      )}

      {carsError && (
        <div className="alert alert-warning container mt-2">
          Erreur lors du chargement des véhicules: {carsError}
        </div>
      )}

      {/* Form for Adding a Location */}
      <div className="container mt-4">
        {loading ? (
          <p>Chargement des véhicules...</p>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Véhicule</label>
              <select 
                className="form-select" 
                value={voitureReservee}
                onChange={(e) => {
                  const selectedCar = cars.find(car => car._id === e.target.value);
                  console.log("Selected car:", selectedCar);
                  if (selectedCar) {
                    setSelectedPlate(selectedCar._id);
                  }
                }}
              >
                <option value="">Sélectionnez un véhicule</option>
                {cars && cars.length > 0 ? (
                  cars.map((car, index) => (
                    <option key={index} value={car._id}>
                      {car.marque || ''} {car.modele || 'Modèle inconnu'} ({car.plaque || 'Plaque inconnue'})
                    </option>
                  ))
                ) : (
                  <option disabled>Aucun véhicule disponible</option>
                )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Nom de l'utilisateur</label>
              <input type="text" className="form-control" value={user} onChange={(e) => setUserId(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date de début</label>
              <input type="date" className="form-control" value={dateDebut} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date de fin</label>
              <input type="date" className="form-control" value={dateFin} onChange={(e) => setEndTime(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Valider</button>
          </>
        )}
      </div>
    </div>
  );
}