import { useState } from 'react';
import { useVar } from '../../Contexts/VariablesGlobales.js';
import { useCSRF } from '../../Contexts/CsrfContext.js';

export function EditClient({ client, setEditClient, setRefresh }) {
    const {ProtocoleEtDomaine}=useVar();
    const {csrfToken}=useCSRF();
  
    const [clientEdit, setClientEdit] = useState(client);
  
    const handleInputChange = (e) => {
      setClientEdit({ ...clientEdit, [e.target.name]: e.target.value });
    }
  
    const handleConfirm  = async () => {
        try {
          const response = await fetch(`${ProtocoleEtDomaine}api/security/edit`, {
            method: 'POST',
            headers:{
              "Content-Type": "application/json",
              'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify(clientEdit),
          });
          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du véhicule.");
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

    console.log("YAHAHAHA")

    return (
      <div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
        <div className="container mt-3">
          <h3>Modifier un client</h3>
          <div className="mb-2">
            <label>Nom :</label>
            <input type="text" className="form-control" name = "name" value={clientEdit.name} placeholder="Entrez le nom d'utilisateur" onChange={handleInputChange}/>
          </div>
          <div className="mb-2">
            <label>Numéro de téléphone :</label>
            <input type="text" className="form-control" name = "phoneNumber" value={clientEdit.phoneNumber} placeholder="Entrez le numéro de téléphone" onChange={handleInputChange}/>
          </div>
          <div className="mb-2">
            <label>Addresse email :</label>
            <input type="text" className="form-control" name = "email" value={clientEdit.email} placeholder="Entrez l'adresse email" onChange={handleInputChange}/>
          </div>
          <div className="mb-2">
            <label>Mot de passe :</label>
            <input type="text" className="form-control" name = "password" value={clientEdit.password} placeholder="Entrez le mot de passe" onChange={handleInputChange}/>
          </div>
          <button className="btn btn-primary" onClick={handleConfirm}>Confirmer</button>
        </div>
        <pre className="mt-3">{JSON.stringify(clientEdit, null, 2)}</pre>
      </div>
    )
  }