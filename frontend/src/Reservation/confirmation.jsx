import Fond from '../utile/style.jsx';
import React, { useState } from "react";


function Confirmation(){
    const [options, setOptions] = useState({
        gps: false,
        siegeBebe: false,
        assurance: false,
    });
  
    const handleOptionChange = (option) => {
      setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
    };
    const [isOpen, setIsOpen] = useState(false); // Pour contrôler l'ouverture du pop-up
    const closePopup = () => setIsOpen(false);

    return (
        <Fond>
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            {/* Section Options */}
            <div className="mb-6">
              <label className="block font-semibold text-lg">Options :</label>
              <div className="flex flex-col gap-4 mt-4">
                {Object.keys(options).map((opt) => (
                  <label key={opt} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options[opt]}
                      onChange={() => handleOptionChange(opt)}
                      className="w-5 h-5"
                    />
                    {opt === "gps" && "GPS"}
                    {opt === "siegeBebe" && "Siège Bébé"}
                    {opt === "assurance" && "Assurance"}
                  </label>
                ))}
              </div>
            </div>
    
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg hover:bg-black transition"
              >
                Paiement
              </button>
            </div>

            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                  <h2 className="text-xl font-semibold text-center">Paiement</h2>
                  <p className="mt-4 text-center text-gray-700">
                    Ici vous payez cher par carte!
                  </p>
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={closePopup}
                      className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black transition"
                    >
                      Paiement réussi (temporaire)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Fond>
      );
}

export default Confirmation;
