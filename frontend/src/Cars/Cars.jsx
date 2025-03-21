import Car from "./Car"
import "./Cars.css"
import { useCSRF } from "../Contexts/CsrfContext";
import { useState, useEffect } from "react";

export default function Cars(){
    //récupérer les voitures quelque part
    const {csrfToken}= useCSRF();
    const [Voitures, setVoitures] = useState([]);
    
    useEffect(()=>{
        const requete= async () =>{
            try {
                const response = await fetch("http://localhost:3000/api/cars", {
                    method: "GET",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include',
                    
                  });
                if (response.ok){
                    const temp=await response.json()
                    const {voitures}= temp
                    setVoitures(voitures)
                }
                
                
                
    
            } catch (err){
                console.error("Erreur lors de la vérification du login :",err)
    
    
            }
        }
        requete();
    },
[])
    
    if (Voitures && Voitures.length>0){
        console.log(Voitures)

        return(
            <div className="product-card-container">
                
                {Voitures.map((care)=>(
                    <Car car={{marque:care.marque, modele:care.modele, prix : care.prix, 
                        ImageUrl: care.ImageUrl, carburant: care.carburant, transmission: care.transmission, description : care.description }} />
    ))}
            </div>
        )
    }

    else{
        return(
            <h1>Il n'y a aucune voiture pour le moment</h1>
        )
    }
    
}


function retrieveCars(csrfToken,setVoitures){
    const requete= async () =>{
        try {
            const response = await fetch("http://localhost:3000/api/cars", {
                method: "GET",
                headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                  "Content-Type": "application/json",
                  'X-CSRF-Token': csrfToken,
                },
                credentials: 'include',
                
              });
            if (response.ok){
                const temp=await response.json()
                const {voitures}= temp
                setVoitures(voitures)
            }
            
            
            

        } catch (err){
            console.error("Erreur lors de la vérification du login :",err)


        }
    }
    requete();
}

