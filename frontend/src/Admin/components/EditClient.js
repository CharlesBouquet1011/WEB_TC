import { useState } from 'react';
import { useCSRF } from '../../Contexts/CsrfContext.js';

export function EditClient({ client, setEditClient, setRefresh }) {
    const {csrfToken}=useCSRF();
  
    const [clientEdit, setClientEdit] = useState(client);
  
    const handleInputChange = (e) => {
      setClientEdit({ ...clientEdit, [e.target.name]: e.target.value });
    }
  
    const handleConfirm  = async () => {
        try {
          const response = await fetch(`/api/security/edit`, {
            method: 'POST',
            headers:{
              "Content-Type": "application/json",
              'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify(clientEdit),
          });
          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du client.");
          }
          setEditClient(false);
          setRefresh(true);
        } catch (error) {
          console.error("Erreur:", error);
        }
    }
  
    const handleClose = () => {
      const confirmDelete = window.confirm("Les modifications ne sont pas enregistrées");
      if (confirmDelete) {
        setEditClient(false);
      }
    }

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <span className="navbar-brand">Modifier un client</span>
            <button className="btn btn-outline-danger" onClick={handleClose}>Retour</button>
          </div>
        </nav>
      
      
      <div className="container mt-4">
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input type="text" className="form-control" name = "name" value={clientEdit.name} placeholder="Entrez le nom d'utilisateur" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
        <label className="form-label">Numéro de téléphone</label>
          <input type="text" className="form-control" name = "phoneNumber" value={clientEdit.phoneNumber} placeholder="Entrez le numéro de téléphone" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
        <label className="form-label">Adresse email</label>
          <input type="text" className="form-control" name = "email" value={clientEdit.email} placeholder="Entrez l'adresse email" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
        <label className="form-label">Mot de passe</label>
          <input type="text" className="form-control" name = "password" value={clientEdit.password} placeholder="Entrez le mot de passe" onChange={handleInputChange}/>
        </div>
          <button className="btn btn-primary" onClick={handleConfirm}>Valider</button>
        </div>
      </div>
    )
  }