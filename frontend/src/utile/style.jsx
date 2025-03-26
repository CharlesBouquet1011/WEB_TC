import React from 'react';
import './style.css';
import Switch from '../utile/bouton_login.jsx';


function Fond({ children }) {
    return (
        <div className="container-fluid">
            <div className='container-vide'>
            {/* En-tête */}
            <header className="bg-dark text-white p-3 mb-4">
                <div className="container">
                    <Switch classe={"home"} page={"/"} texte={"Accueil"} />
                    <h1 className='text-center'>Driving Enhanced</h1>
                </div>
            </header>

            {/* Corps principal */}
            <main className='flex-grow-1'>
                {children}
            </main>

            {/* Pied de page */}
            <footer className="bg-dark text-white p-3 mt-4">
                <div className="container">
                    <p>&copy; Driving Enhanced. Tous droits réservés.</p>
                </div>
            </footer>
            </div>
        </div>
    );
}

export default Fond;
