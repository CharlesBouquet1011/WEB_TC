

import { useNavigate } from "react-router";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import "./deleteBooking.css"; 

import { useCSRF } from "../Contexts/CsrfContext";
import { useVar } from "../Contexts/VariablesGlobales";
Modal.setAppElement("#root"); // Obligatoire pour l'accessibilité

export default function DeleteBooking({idBooking}) {
    const { csrfToken } = useCSRF();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {ProtocoleEtDomaine} =useVar()
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
  
    const confirmDeletion = () => {
      BookingDeletion(csrfToken, navigate,idBooking,ProtocoleEtDomaine);
      closeModal();
    };
  
    return (
      <div>
        <button className="Booking-delete-button" onClick={openModal}>
          Supprimer mon compte
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Confirmation de suppression"
          className="modal-Booking-Deletion" // Classe pour la modal
          overlayClassName="modal-Booking-Deletion-overlay" // Classe pour le fond
        >
          <h2 className="Booking-delete-modal-title">Confirmation</h2>
          <p className="Booking-delete-modal-message">
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
          </p>
          <div className="Booking-delete-modal-actions">
            <button className="Booking-delete-cancel-button" onClick={closeModal}>
              Annuler
            </button>
            <button className="Booking-delete-confirm-button" onClick={confirmDeletion}>
              Supprimer
            </button>
          </div>
        </Modal>
      </div>
    );
  }

function BookingDeletion(csrfToken,navigate,idBooking,domaine){
    //on se déconnecte
    const deletion= async () =>{
            try {
                const response = await fetch(domaine + "api/bookings/delete", {
                    method: "DELETE",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include',
                    body:JSON.stringify({idBooking: idBooking})
                    
                  });
                if (response.ok){
                    navigate("/")
                    
                    return null;
                }
                
    
                
    
            } catch (err){
                console.error("Erreur lors de la vérification du login :",err)
    
    
            }
        }
        deletion();
    }