import { useState } from 'react';
import { useFetchCars } from './useFetchCars.js';
import { useVar } from '../../Contexts/VariablesGlobales.js';
import { useCSRF } from '../../Contexts/CsrfContext.js';

export function EditLocation({ location, setEditLoc, setRefresh }) {
  const {ProtocoleEtDomaine}=useVar();
  const {csrfToken}=useCSRF();
  const { cars, loading, error: carsError } = useFetchCars();

  const [locationEdit, setLocEdit] = useState(location);

  const handleUpdate = (e) => {
    setLocEdit({...locationEdit, [e.target.name]: e.target.value});
  }

  const handleSubmit  = async () => {
    try {
      const response = await fetch(`${ProtocoleEtDomaine}api/bookings/modify`, {
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(locationEdit),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la location.");
      }
      setEditLoc(false);
      setRefresh(true);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  const handleClose = () => {
    const confirmDelete = window.confirm("Les modifications ne sont pas enregistrées");
    if (confirmDelete) {
      setEditLoc(false);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand">Modifier une Location</span>
          <button className="btn btn-outline-danger" onClick={handleClose}>Retour</button>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="mb-3">
          <label className="form-label">Véhicule</label>
          <select
            className="form-select"
            name="vehiculeReserve"
            value={locationEdit.vehiculeReserve}
            aria-placeholder="Veuillez sélectionner un véhicule"
            onChange={handleUpdate}
          >
            {cars.map((car, index) => (
              <option key={car._id} value={car._id}>
                {car.marque || ''} {car.modele || 'Modèle inconnu'} ({car.plaque || 'Plaque inconnue'})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Nom de l'utilisateur</label>
          <input
            type="text"
            className="form-control"
            name="user"
            value={locationEdit.user}
            onChange={handleUpdate}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de début</label>
          <input
            type="date"
            className="form-control"
            name="dateDebut"
            value={locationEdit.dateDebut}
            onChange={handleUpdate}
          />
        </div>

        {/* End Date */}
        <div className="mb-3">
          <label className="form-label">Date de fin</label>
          <input
            type="date"
            className="form-control"
            name="dateFin"
            value={locationEdit.dateFin}
            onChange={handleUpdate}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>Valider</button>
      </div>
    </div>
  );
}