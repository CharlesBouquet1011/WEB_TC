import React from 'react';
import './style.css'; // Importer un fichier CSS personnalisé si nécessaire
import { Link } from "react-router-dom";
import { useState } from "react";

export function Fond({ children }) {
    return (
        <div className="container-fluid">
            {/* Corps principal */}
            <main>
                {children}
            </main>

            {/* Pied de page */}
            <footer className="bg-dark text-white p-3 mt-4">
                <div className="container">
                    <p>&copy; Driving Enhanced. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
        {/* Navbar Bootstrap avec bouton menu */}
        <header className="bg-dark text-white p-3 mb-4 d-flex align-items-center">
          <div className="container d-flex justify-content-between align-items-center">
            {/* Bouton menu (hamburger) */}
            <button className="btn btn-light ombre" onClick={() => setIsOpen(!isOpen)}>
              <img src="/image/menu.png" alt="menu" class="menu" />
            </button>
  
            {/* Titre du site */}
            <h1 className="m-0">Driving Enhanced</h1>
          </div>
        </header>
  
        {/* Menu latéral (Sidebar) */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ×
          </button>
          <nav>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/cars">Voitures</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
  
        {/* Overlay pour fermer le menu en cliquant à côté */}
        {isOpen && <div className="menuoverlay" onClick={() => setIsOpen(false)}></div>}
      </>
    );
  }
  
export default Fond;
