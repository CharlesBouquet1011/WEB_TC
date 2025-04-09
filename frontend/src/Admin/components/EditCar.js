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
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand">Modifier un véhicule</span>
          <button className="btn btn-outline-danger" onClick={handleClose}>Retour</button>
        </div>
      </nav>

      {/* <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button> */}
      <div className="container mt-3">
        <div className="mb-3">
          <label className="form-label">Marque :</label>
          <input type="text" className="form-control" name = "marque" value={carEdit.marque} placeholder="Marque" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Modèle :</label>
          <input type="text" className="form-control" name = "modele" value={carEdit.modele} placeholder="Modèle" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Plaque :</label>
          <input type="text" className="form-control" name = "plaque" value={carEdit.plaque} placeholder="Plaque" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">URL image :</label>
          <input type="text" className="form-control" name = "imageURL" value={carEdit.imageURL} placeholder="URL image" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Type de véhicule :</label>
          <input type="text" className="form-control" name = "type" value={carEdit.type} placeholder="Type de véhicule" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre de places :</label>
          <input type="text" className="form-control" name = "nb_places" value={carEdit.nb_places} placeholder="Nombre de places" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Prix affiché :</label>
          <input type="text" className="form-control" name = "prix" value={carEdit.prix} placeholder="Prix affiché" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Carburant :</label>
          <input type="text" className="form-control" name = "carburant" value={carEdit.carburant} placeholder="Carburant" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Transmission :</label>
          <input type="text" className="form-control" name = "transmission" value={carEdit.transmission} placeholder="Transmission" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Description :</label>
          <textarea rows="3" className="form-control" name = "description" value={carEdit.description} placeholder="Description" onChange={handleInputChange}/>
        </div>
        <div className="mb-5">
          <button className="btn btn-primary" onClick={handleConfirm}>Enregistrer les modifications</button>
        </div>
      </div>
      {/* <pre className="mt-3">{JSON.stringify(carEdit, null, 2)}</pre> */}
    </div>
  )
}