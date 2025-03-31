import Car from "./Car"
import "./Cars.css"
import { useCSRF } from "../Contexts/CsrfContext";
import { useState, useEffect } from "react";
import Fond from '../utile/style.jsx';
import { useVar } from "../Contexts/VariablesGlobales.js";
import { motion } from "framer-motion";


export default function Cars(){
    //récupérer les voitures quelque part
    const {csrfToken}= useCSRF();
    const [Voitures, setVoitures] = useState([]);
    const {ProtocoleEtDomaine}=useVar()
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 200); // Petit délai pour un effet fluide
    }, []);
    useEffect(()=>{
        const requete= async () =>{
            try {
                const response = await fetch(ProtocoleEtDomaine+"api/cars", {
                    method: "GET",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include', 
                  });
                if (response.ok){
                    const {voitures} = await response.json()
                    setVoitures(voitures)
                }
            } catch (err){
                console.error("Erreur lors de la vérification du login :",err)
            }
        }
        requete();
    }, []);
    
    if (Voitures && Voitures.length>0){
        
        return(
            <Fond>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50">
            {Voitures.map((care, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }} // Départ : invisible et décalé vers le bas
                    animate={isLoaded ? { opacity: 1, x: 0 } : {}} // Apparition progressive
                    transition={{ duration: 0.5, delay: index * 0.1 }} // Effet en cascade
                >
                    <Car car={{
                        marque: care.marque,
                        modele: care.modele,
                        prix: care.prix,
                        ImageUrl: care.imageURL,
                        carburant: care.carburant,
                        transmission: care.transmission,
                        description: care.description
                    }} />
                </motion.div>
            ))}
        </div>
            </Fond>
        )
    }

    else{
        return(
            <Fond>
            <h1>Il n'y a aucune voiture pour le moment</h1>
            </Fond>
        )
    }
    
}


