import { useNavigate } from "react-router";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import "./deleteAccount.css"; 

import { useCSRF } from "../Contexts/CsrfContext";
import { useVar } from "../Contexts/VariablesGlobales";
import { useAuth } from "../Contexts/Authenticated";
Modal.setAppElement("#root"); // Obligatoire pour l'accessibilité

export default function DeleteAccount() {
    const { csrfToken } = useCSRF();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const {ProtocoleEtDomaine}=useVar()
    const {setTriedLogging,triedLogging}=useAuth()
    const confirmDeletion = () => {
      accountDeletion(csrfToken, navigate,ProtocoleEtDomaine,setTriedLogging,triedLogging);
      closeModal();
    };
  
    return (
      <div>
      <button
        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all"
        onClick={openModal}
      >
        Supprimer mon compte
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-xl shadow-xl w-96 mx-auto"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold text-gray-800">Confirmation</h2>
        <p className="text-gray-600 mt-4">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible.
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            onClick={closeModal}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={confirmDeletion}
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
    );
  }

function accountDeletion(csrfToken,navigate,ProtocoleEtDomaine,setTriedLogging,triedLogging){
    //on se déconnecte
    
    const deletion= async () =>{
            try {
                const response = await fetch(ProtocoleEtDomaine+"api/security/deleteAccount", {
                    method: "DELETE",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include',
                    
                  });
                if (response.ok){
                    navigate("/")
                    setTriedLogging(!triedLogging)
                    return null;
                }
                
    
                
    
            } catch (err){
                console.error("Erreur lors de la vérification du login :",err)
    
    
            }
        }
        deletion();
    }