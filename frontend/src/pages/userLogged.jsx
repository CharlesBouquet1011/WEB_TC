import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import SeeBookings from "../Locations/seeBookings";

export default function UserLogged(){
    const {csrfToken}= useCSRF();
    const navigate=useNavigate()
    useEffect(()=>{ //on récupère les bookings
        const isLogged= async () =>{
            try {
                const response = await fetch("http://localhost:3000/api/security/logged", {
                    method: "GET",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include',
                    
                  });
                if (!response.ok){
                    navigate("/")
                    alert("Veuillez vous connecter")
                    return null;
                }
                

                
    
            } catch (err){
                console.error("Erreur lors du chargement des locations :",err)
    
    
            }
        }
        isLogged();},
        [] 
    )
    return(//il faudra rajouter des composants ici
        <div>
            <h1> Vous êtes connectés</h1>
            <SeeBookings />
        </div>
    )
}