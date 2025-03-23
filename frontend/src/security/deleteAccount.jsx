import { useNavigate } from "react-router";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import "./deleteAccount.css"; 

import { useCSRF } from "../Contexts/CsrfContext";
Modal.setAppElement("#root"); // Obligatoire pour l'accessibilité

export default function DeleteAccount() {
    const { csrfToken } = useCSRF();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
  
    const confirmDeletion = () => {
      accountDeletion(csrfToken, navigate);
      closeModal();
    };
  
    return (
      <div>
        <button className="account-delete-button" onClick={openModal}>
          Supprimer mon compte
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Confirmation de suppression"
          className="modal-Account-Deletion" // Classe pour la modal
          overlayClassName="modal-Account-Deletion-overlay" // Classe pour le fond
        >
          <h2 className="account-delete-modal-title">Confirmation</h2>
          <p className="account-delete-modal-message">
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
          </p>
          <div className="account-delete-modal-actions">
            <button className="account-delete-cancel-button" onClick={closeModal}>
              Annuler
            </button>
            <button className="account-delete-confirm-button" onClick={confirmDeletion}>
              Supprimer
            </button>
          </div>
        </Modal>
      </div>
    );
  }

function accountDeletion(csrfToken,navigate){
    //on se déconnecte
    const deletion= async () =>{
            try {
                const response = await fetch("http://localhost:3000/api/security/deleteAccount", {
                    method: "POST",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include',
                    
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