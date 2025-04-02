import { useState } from 'react';
import { useVar } from '../../Contexts/VariablesGlobales.js';
import { useCSRF } from '../../Contexts/CsrfContext.js';

export function EditCar({ car, setEditTab, setRefresh }) {
  const {ProtocoleEtDomaine}=useVar();
  const {csrfToken}=useCSRF();

  const [carEdit, setCarEdit] = useState(car);

  const handleInputChange = (e) => {
    setCarEdit({ ...carEdit, [e.target.name]: e.target.value });
  }

  const handleConfirm  = async () => {
      try {
        const response = await fetch(`${ProtocoleEtDomaine}api/cars/edit`, {
          method: 'POST',
          headers:{
            "Content-Type": "application/json",
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify(carEdit),
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du véhicule.");
        }
        setEditTab(false);
        setRefresh(true);
      } catch (error) {
        console.error("Erreur:", error);
      }
  }

  const handleClose = () => {
    const confirmDelete = window.confirm("Les modifications ne sont pas enregistrées");
    if (confirmDelete) {
      setEditTab(false);
    }
  }

  return (
    <div>
      <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
      <div className="container mt-3">
        <h3>Modifier une voiture</h3>
        <div className="mb-2">
          <label>Marque :</label>
          <input type="text" className="form-control" name = "marque" value={carEdit.marque} placeholder="Entrez votre nom d'utilisateur" onChange={handleInputChange}/>
        </div>
        <div className="mb-2">
          <label>Modèle :</label>
          <input type="text" className="form-control" name = "modele" value={carEdit.modele} placeholder="Entrez votre nom d'utilisateur" onChange={handleInputChange}/>
        </div>
        <button className="btn btn-primary" onClick={handleConfirm}>Confirmer</button>
      </div>
      <pre className="mt-3">{JSON.stringify(carEdit, null, 2)}</pre>
    </div>
  )
}