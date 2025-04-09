import { useState, useEffect } from 'react';
import { LocationRow } from './LocationRow.js';
import { AddLocation } from './AddLocation.js';
import { EditLocation } from './EditLocation.js';
import { useVar } from '../../Contexts/VariablesGlobales.js';
import { useCSRF } from '../../Contexts/CsrfContext.js';


export function Location({}) {
    const {ProtocoleEtDomaine}=useVar();
    const {csrfToken}=useCSRF();

    const [locations, setLocations] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [addLocationMode, setAddLocationMode] = useState(false);
    const [editLocMode, setEditLoc] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
          try {
            const response = await fetch(ProtocoleEtDomaine+"api/bookings/seeAll");
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des locations: ${response.status}`);
            }
            const data = await response.json();
            setLocations(data);
            setRefresh(false);

          } catch (error) {
            console.error("Erreur:", error);
          }
        };
        fetchLocations();
      }, [refresh]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette location ?");
        if (confirmDelete) {
            try {
            const response = await fetch(`${ProtocoleEtDomaine}api/bookings/deleteAdmin/${id}`, {
                    method: "DELETE",
                    headers:{
                        'X-CSRF-Token': csrfToken,
                    }
                });
                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression de la location.");
                }
                setRefresh(true);
            } catch (error) {
                console.error("Erreur:", error);
            }
        }
    }

    if (addLocationMode === true) {
        return (
            <div>
                <AddLocation setAddLocation={setAddLocationMode} setRefresh={setRefresh}/>
            </div>
        )
    } else if (editLocMode !== false) {
        return(
            <div>
                <EditLocation location={locations.bookings.find(location => location._id === editLocMode)} setEditLoc={setEditLoc} setRefresh={setRefresh}/>
            </div>
        )

    } else {
        return (
            <div className="container mt-4">
                <button type="button" className="btn btn-secondary btn-lg mb-3" onClick={() => setAddLocationMode(true)}>Ajouter une location +</button>
                    {locations && locations.bookings && locations.bookings.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Voiture</th>
                                    <th>Utilisateur</th>
                                    <th>Début</th>
                                    <th>Fin</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locations.bookings.map((location, index) => (
                                    <LocationRow 
                                        key={location._id} 
                                        id = {location._id}
                                        voiture={location.voitureReservee} 
                                        user={location.user} 
                                        startTime={location.dateDebut} 
                                        endTime={location.dateFin}
                                        setEditLoc={setEditLoc}
                                        handleDelete={handleDelete} 
                                    />
                                )) || "Chargement..."}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-info">
                            Aucune location disponible
                        </div>
                    )}
            </div>
        );
    }
}