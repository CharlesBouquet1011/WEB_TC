import React from 'react';
import './style.css'; // Importer un fichier CSS personnalisé si nécessaire
import { Link } from "react-router-dom";
import { useState } from "react";
import { useVar } from '../Contexts/VariablesGlobales';
import { retrieveAssistanceData } from '../Locations/Assistance';
import { useCSRF } from '../Contexts/CsrfContext';

export function Fond({ children }) {
    const [mail,setMail]=useState("")
      const {csrfToken}=useCSRF()
      const[phoneNumber,setPhoneNumber]=useState("")
      const {ProtocoleEtDomaine}=useVar()
      retrieveAssistanceData(csrfToken,setMail,setPhoneNumber,ProtocoleEtDomaine)
    return (
        <div className='container-fluid'>
            {/* Corps principal */}
            <main>
                {children}
            </main>

            {/* Pied de page */}
            <footer className="bg-gray-900 text-white text-center p-5">
                <div className="container mx-auto">
                <p>&copy; Driving Enhanced. Tous droits réservés.</p>
                <div className="flex justify-center gap-6 mt-2">
                    <span>
                        📧 <a href={`mailto:${mail}`} className="text-warning text-decoration-none">{mail}</a>
                    </span>
                    <span>
                        📞 <a href={`tel:${phoneNumber}`} className="text-warning text-decoration-none">{phoneNumber}</a>
                    </span>
                </div>
                </div>
            </footer>
        </div>
    );
}

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const { ProtocoleEtDomaine } = useVar();
  
    return (
      <>
        {/* Header avec bouton menu à gauche */}
        <header className="fixed top-0 left-0 z-50 p-3 flex">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo/Menu hamburger à gauche */}
            <button onClick={() => setIsOpen(true)} className="focus:outline-none">
              <img
                src={`${ProtocoleEtDomaine}media/image/menu.png`}
                alt="menu"
                className="fixed top-3 left-6 z-10 w-10 h-10 hover:scale-105 transition-transform"
              />
            </button>
          </div>
        </header>
  
        {/* Menu latéral (Sidebar) */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg z-50`}
        >
          {/* Bouton de fermeture en haut à droite */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-2xl focus:outline-none"
          >
            ×
          </button>
  
          <nav className="mt-16 p-4">
            <ul className="space-y-4 text-lg">
              <li><Link to="/cars" className="block px-6 py-2 hover:bg-gray-700 rounded">Voitures</Link></li>
              <li><Link to="/services" className="block px-6 py-2 hover:bg-gray-700 rounded">Services</Link></li>
              <li><Link to="/contact" className="block px-6 py-2 hover:bg-gray-700 rounded">Contact</Link></li>
            </ul>
          </nav>
        </div>
  
        {/* Overlay pour fermer le menu en cliquant à côté */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </>
    );
  }
  
export default Fond;
