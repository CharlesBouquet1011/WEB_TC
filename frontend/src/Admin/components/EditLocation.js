import { useState } from 'react';
import { useFetchCars } from './useFetchCars.js';
import { useCSRF } from '../../Contexts/CsrfContext.js';
import { useFetchUsers } from './useFetchUsers.js';

export function EditLocation({ location, setEditLoc, setRefresh }) {
  const {csrfToken}=useCSRF();
  const { cars, loading_cars, error: carsError } = useFetchCars();
  const { users, loading_users, error: usersError } = useFetchUsers();

  const [locationEdit, setLocEdit] = useState(location);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
  
    if (name === "voitureReservee") {
      const selectedCar = cars.find((car) => car._id === value);
      setLocEdit((prev) => ({ ...prev, voitureReservee: selectedCar || null }));
    } else if (name === "user") {
      const selectedUser = users.find((u) => u._id === value);
      setLocEdit((prev) => ({ ...prev, user: selectedUser || null }));
    } else {
      setLocEdit((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit  = async () => {
    try {
      const response = await fetch(`/api/bookings/modify`, {
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
            name="voitureReservee"
            value={locationEdit.voitureReservee._id || ""}
            onChange={handleUpdate}
          >
            <option value="">Sélectionnez un véhicule</option>
            {cars.map((car) => (
              <option key={car._id} value={car._id}>
                {car.marque || ''} {car.modele || 'Modèle inconnu'} ({car.plaque || 'Plaque inconnue'})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Utilisateur</label>
          <select 
            className="form-select" 
            name="user"
            value={locationEdit.user._id || ""}
            onChange={handleUpdate}
          >
            <option value="">Sélectionnez un utilisateur</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name || ''} ({user.email || ''})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Date de début</label>
          <input
            type="date"
            className="form-control"
            name="dateDebut"
            value={locationEdit.dateDebut?.slice(0, 10)}
            onChange={handleUpdate}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de fin</label>
          <input
            type="date"
            className="form-control"
            name="dateFin"
            value={locationEdit.dateFin?.slice(0, 10)}
            onChange={handleUpdate}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>Valider</button>
      </div>
    </div>
  );
}