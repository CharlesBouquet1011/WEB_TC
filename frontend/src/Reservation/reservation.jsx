import Fond from '../utile/style.jsx';
import { useVar, ProtocoleEtDomaine } from '../Contexts/VariablesGlobales.js';
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useCSRF } from "../Contexts/CsrfContext";
import React, { useEffect } from 'react';

function Reservation(){
  const {voitureSelectionnee} = useVar();
  const [startDate, setStartDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Pour contrôler l'ouverture du pop-up
  const closePopup = () => setIsOpen(false);
  const [endDate, setEndDate] = useState(null);
  const [disponible, setDisponible] = useState(null);
  const [error, setError] = useState(null);
  const [paiement, setPaiement] = useState(null);
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();
  const {ProtocoleEtDomaine} =useVar();
  const { csrfToken } = useCSRF();
  if (!voitureSelectionnee) {
    return (
      <Fond>
        <div>
            Veuillez sélectionner une voiture au préalable
            <button
              className="mt-4 block text-gray-500 underline hover:text-black transition"
              onClick={() => navigate("/cars")}
            >
              ← Retour à la sélection
            </button>
        </div>
      </Fond>
    );
  } else {
    return (
      <Fond>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-10 p-6">
          <div className="relative w-full h-80">
            <img
              src={voitureSelectionnee.imageURL} //affiche l'image de la voiture
              alt={`${voitureSelectionnee.marque} ${voitureSelectionnee.modele}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Infos voiture */}
          <div className="p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {voitureSelectionnee.marque} {voitureSelectionnee.modele}
            </h1>
            <p className="text-gray-600 mt-2">{voitureSelectionnee.description}</p>

            <div className="flex justify-center space-x-6 mt-4 text-lg text-gray-700">
              <span>⛽ {voitureSelectionnee.carburant}</span>
              <span>⚙ {voitureSelectionnee.transmission}</span>
            </div>

            <p className="text-2xl font-semibold text-gray-900 mt-4">
              À partir de {voitureSelectionnee.prix} €
            </p>

            {/* DatePicker */}
            <div className="flex flex-col items-center mt-6">
              <div className="flex space-x-4">
                <div>
                  <label className="text-gray-700 font-medium">Début :</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    className="border p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Fin :</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || new Date()}
                    className="border p-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
            <button
              onClick={() =>{
                if (!startDate || !endDate) {
                    setDateError("Veuillez sélectionner des dates avant de vérifier la disponibilité.");
                    return;
                }
                  setDateError("");
                  checkDisponibilite(csrfToken,startDate,endDate,voitureSelectionnee,ProtocoleEtDomaine,setError,setPaiement,setIsOpen,navigate);
              }} 
              className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg text-lg hover:bg-black transition"
            >
              Vérifier la disponibilité
            </button>
            </div>
                {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
            <div>
                {error && <p className="text-red-500">{error}</p>} 
            </div>

            {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-xl font-semibold text-center">Désolé</h2>
              <p className="mt-4 text-center text-gray-700">
                La voiture n'est pas disponible pour les dates choisies. Essayez a une autre date ou choisissez une autre voiture. Veuillez nous contacter pour plus d'informations.
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={closePopup}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Fermer
                </button>
              </div>
            </div>
            </div>
            )}
            </div>
            <div>
            <button
              className="mt-4 block text-gray-500 underline hover:text-black transition"
              onClick={() => navigate ("/cars")}
            >
              ← Retour à la sélection
            </button>
          </div>
        </div>
      </Fond>
    );
    };
}

export default Reservation;

function AddBooking(startDate,endDate,csrfToken,voitureSelectionnee,navigate,domaine,setError){
    setError(null);
    const ajout= async () =>{
            try {
                const response = await fetch(domaine + "api/bookings/add", {
                    method: "POST",
                    headers: { 
                      'X-CSRF-Token': csrfToken,
                      'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body:JSON.stringify({dateDebut:startDate.toISOString(), dateFin: endDate.toISOString(),voitureReservee: voitureSelectionnee._id})
                    
                  });
                if (response.ok){
                    navigate("/confirmation");                   
                    return(null);
                } else {
                    console.error("Erreur lors de l'ajout du booking :");
                    setError("Veuillez réessayer plus tard"); 
                }
    
            } catch (err){
               return (null);                 

            }
        }
        ajout();
}


function checkDisponibilite(csrfToken,startDate,endDate,voitureSelectionnee,ProtocoleEtDomaine,setError,setPaiement,setIsOpen,navigate) {
  const checkDisponibiliteAPI = async () => {
        try {
            const response = await fetch(ProtocoleEtDomaine + "api/bookings/check-disponibilite", {
                method: "POST",
                headers: {
                    'X-CSRF-Token': csrfToken,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    dateDebut: startDate.toISOString(),
                    dateFin: endDate.toISOString(),
                    voitureReservee: voitureSelectionnee._id
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.disponible) {
                    AddBooking(startDate, endDate, csrfToken, voitureSelectionnee, navigate, ProtocoleEtDomaine, setError);
                    setPaiement("en cours");
                } else {
                    setIsOpen(true); // Ouvre le pop-up si non disponible
                }
            } else {
                console.error("Erreur lors de la vérification de la disponibilité");
                setError("Veuillez réessayer plus tard");
            }
        } catch (err) {
            console.error("Erreur de communication avec l'API de disponibilité:", err);
            setError("Erreur de communication avec le serveur");
        }
    };

    checkDisponibiliteAPI();
}
