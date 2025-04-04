import { useState, useEffect } from 'react';
import { ClientRow } from './ClientRow.js';
import { EditClient } from './EditClient.js';
import { useVar } from '../../Contexts/VariablesGlobales.js';
import { useCSRF } from '../../Contexts/CsrfContext.js';

const clientList = [
    {
        "name": "Mathis",
        "phoneNumber": 1,
        "email": "blabla@insa-lyon.fr",
        "password": "JeSuisMathis",
        "admin": true,
    },
    {
        "name": "Charles",
        "phoneNumber": 2,
        "email": "blibli@insa-lyon.fr",
        "password": "JeSuisCharles",
        "admin": false,
    },
    {
        "name": "Anais",
        "phoneNumber": 3,
        "email": "bloblo@insa-lyon.fr",
        "password": "JeSuisAnais",
        "admin": false,
    },
    {
        "name": "Paul-Henri",
        "phoneNumber": 4,
        "email": "blublu@insa-lyon.fr",
        "password": "JeSuisPH",
        "admin": true,
    }
];

export function Client({}) {
  const {ProtocoleEtDomaine}=useVar();
  const {csrfToken}=useCSRF();

  const [clients, setClients] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editClient, setEditClientMode] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        console.log("Fetching clients...")
        const response = await fetch(ProtocoleEtDomaine+"api/security/seeAll");
        console.log(response);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des clients");
        }
        const data = await response.json();
        setClients(data);
        setRefresh(false);
        console.log("Fetching alright")
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchClients();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${ProtocoleEtDomaine}api/security/deleteAccount/${id}`, {
          method: 'DELETE',
          headers:{
            'X-CSRF-Token': csrfToken,
          }
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du client.");
        }
        setRefresh(true);
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  }

  const handleAddClient = async () => {
    try {
      const randomClient =  clientList[Math.floor(Math.random()*clientList.length)];
      console.log(randomClient);
      const response = await fetch(`${ProtocoleEtDomaine}api/security/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(randomClient),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du client.");
      }
      console.log("refresh")
      setRefresh(true);
    } catch (error) {
      console.error("Erreur:", error);
    }
    console.log("are there any clients?", clients.users);
  }
  
  if (setEditClientMode === true) {
    return (
        <div>
            <EditClient client={clients.email?.find(client => client._id === editClient)} setEditClient={setEditClientMode} setRefresh={setRefresh}/>
        </div>
    )
  } else {
    return (
        <div className="container mt-4">
            <button type="button" className="btn btn-secondary btn-lg mb-3" onClick={() => handleAddClient()}>Ajouter un client +</button>
                {clients && clients.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Numero</th>
                                <th>Email</th>
                                <th>Fin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.users?.map((client, index) => (
                                <ClientRow 
                                    key={client._id} 
                                    name={client.name} 
                                    number={client.phoneNumber} 
                                    email={client.email} 
                                    password={client.password}
                                    admin={client.admin}
                                    setEditClient={setEditClientMode}
                                    handleDelete={handleDelete} 
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="alert alert-info">
                        Aucun client disponible
                    </div>
                )}
        </div>
    );
  }
}