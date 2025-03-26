import React from 'react';
import './style.css'; // Importer un fichier CSS personnalisé si nécessaire

function Fond({ children }) {
    return (
        <div className="container-fluid">
            {/* En-tête */}
            <header className="bg-dark text-white p-3 mb-4">
                <div className="container">
                    <h1>Driving Enhanced</h1>
                </div>
            </header>

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

export default Fond;
