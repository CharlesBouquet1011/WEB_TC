import { useState } from "react";
import { useFetchCars } from './useFetchCars';
import { useVar } from '../../Contexts/VariablesGlobales.js';
import { useCSRF } from '../../Contexts/CsrfContext.js';

export function AddLocation({ setAddLocation, setRefresh }) {
  const{ProtocoleEtDomaine}=useVar();
  const {csrfToken}=useCSRF();
  const { cars, loading, error: carsError } = useFetchCars();

  const [locationAdded, setLocationAdded] = useState({
    voitureReservee: "",
    user: "",
    dateDebut: "",
    dateFin: "",
  });

  const handleInputChange = (e) => {
    setLocationAdded((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!locationAdded.dateDebut || !locationAdded.dateFin || !locationAdded.user || !locationAdded.voitureReservee) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    if (new Date(locationAdded.dateDebut) < today) {
      alert("Date de début invalide.");
      return;
    } 
    if (new Date(locationAdded.dateFin) <= new Date(locationAdded.dateDebut)) {
      alert("La date de fin doit être postérieure à la date de début.");
      return;
    }

    try {
      console.log("Sending data:", locationAdded)
      const response = await fetch(`${ProtocoleEtDomaine}api/bookings/add`, {
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(locationAdded),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status} - ${responseData.message || "Aucune réponse"}`);
      }
      console.log("Success:", responseData);
      setAddLocation(false);
      setRefresh(true);
    } catch (error) {
      console.error("Erreur:", error);
      alert(`Erreur: ${error.message}`);
    }
  }

  const handleClose = () => {
    const confirmDelete = window.confirm("Les modifications ne sont pas enregistrées");
    if (confirmDelete) {
      setAddLocation(false);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand">Ajouter une Location</span>
          <button 
            className="btn btn-outline-danger" 
            onClick={handleClose} 
            type="button"
          >
            Retour
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        {loading ? (
          <p>Chargement des véhicules...</p>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Véhicule</label>
              <select 
                className="form-select" 
                name="voitureReservee"
                value={locationAdded.voitureReservee || ""}
                onChange={(e) => {
                  setLocationAdded((prev) => ({
                    ...prev,
                    voitureReservee: e.target.value
                  }));
                }}
              >
                <option value="">Sélectionnez un véhicule</option>
                {cars && cars.length > 0 ? (
                  cars.map((car, index) => (
                    <option key={car._id} value={car._id}>
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
              <input type="text" className="form-control" name="user" value={locationAdded?.user || ""} placeholder="Entrez le nom d'utilisateur" onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date de début</label>
              <input type="date" className="form-control" name="dateDebut" value={locationAdded.dateDebut || ""} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Date de fin</label>
              <input type="date" className="form-control" name="dateFin" value={locationAdded.dateFin || ""} onChange={handleInputChange} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Valider</button>
          </>
        )}
      </div>
    </div>
  );
}