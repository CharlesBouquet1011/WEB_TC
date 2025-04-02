import { useState, useEffect } from 'react';
import { LocationRow } from './LocationRow.js';
import { AddLocation } from './AddLocation.js';

export function Location({}) {
    const [locations, setLocations] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [addLocationMode, setAddLocationMode] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
          try {
            console.log("Fetching locations...");
            const response = await fetch("http://localhost/api/bookings/seeAll");
            console.log("Booking api reponse status:", response.status)
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error reponse:", errorText);
                throw new Error(`Erreur lors de la récupération des locations: ${response.status}`);
            }
            const data = await response.json();
            console.log("Bookings data:", data);
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
                const response = await fetch(`http://localhost/api/bookings/delete/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression de la location.");
                }

                setRefresh(true);
            } catch (error) {
                console.error("Erreur:", error);
            }
        }
    };
    
    const handleAddLocation = async (locationData) => {
        try {
            console.log("Sending loc data:", locationData)

            const response = await fetch("http://localhost/api/bookings/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dateDebut: locationData.dateDebut,
                    dateFin: locationData.dateFin,
                    user: locationData.user,
                    voitureReservee: locationData.voitureReservee
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout de la location.");
            }

            setRefresh(true);
            setAddLocationMode(false);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    if (!addLocationMode) {
        return (
            
        )
    }

    return (
        <div className="container mt-4">
            {/* Add Location Form - Appears when addLocationMode is true */}
            {addLocationMode && handleAddLocation && (
                <AddLocation 
                    onAdd={handleAddLocation} 
                    onCancel={() => setAddLocationMode(false)} 
                />
            )}
    
            {/* Button to open AddLocation form */}
            {!addLocationMode && (
                <button
                    type="button"
                    className="btn btn-secondary btn-lg mb-3"
                    onClick={() => setAddLocationMode(true)}
                >
                    Ajouter une location +
                </button>
            )}
    
            {/* Locations Table - Only show if addLocationMode is false */}
            {!addLocationMode && (
                <>
                    {locations && locations.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Plaque</th>
                                    <th>Modèle</th>
                                    <th>Utilisateur</th>
                                    <th>Début</th>
                                    <th>Fin</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locations.map((location, index) => (
                                    <LocationRow 
                                        key={index} 
                                        plate={location._id} 
                                        model={location.voitureReservee?.modele || "N/A"} 
                                        startTime={location.dateDebut} 
                                        endTime={location.dateFin} 
                                        userId={location.user} 
                                        handleDelete={handleDelete} 
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-info">
                            Aucune location disponible
                        </div>
                    )}
                </>
            )}
        </div>
    );
}