import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Confirmation(){
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const handleAction = () => {
        setIsOpen(false); 
        navigate("/user");
    };
    return (
        <div>
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-xl text-black font-semibold text-center">Paiement</h2>
                <p className="mt-4 text-center text-gray-700">
                Ici vous payez cher par carte!
                </p>
                <div className="flex justify-center mt-6">
                <button
                    onClick={handleAction}
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-black transition"
                >
                    Paiement réussi (temporaire)
                </button>
                </div>
            </div>
            </div>
        )}
        </div> 
    );
}
