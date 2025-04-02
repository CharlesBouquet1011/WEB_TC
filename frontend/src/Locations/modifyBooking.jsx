import { useNavigate } from "react-router";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import "./deleteBooking.css"; 

import { useCSRF } from "../Contexts/CsrfContext";
import { useVar } from "../Contexts/VariablesGlobales";
import { handleChange,AnimationCarteCar } from "../security/registration";
export default function ModifyBooking({idBooking}){
    const [Booking,setBooking]= useState({idBooking:idBooking,nvDateDebut:"",nvDateFin:"",idnvVoitureReservee:""})  
    const [voitures,setVoitures]=useState()
    const changeVoiture = (car)=> {
        setBooking(etatPrec=>({
            ...etatPrec,
            idnvVoitureReservee:car._id
        }))
        //il faudrait aussi marquer la carte sélectionnée
    }
    const changeDateDebut= (date)=>{
        setBooking(etatPrec=>({
            ...etatPrec,
            nvDateDebut:date
        }))
    }
    const changeDateFin = (date)=>{
        setBooking(etatPrec=>({
            ...etatPrec,
            nvDateFin:date
        }))
    }


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

    return(
        <>
        <form>
            {// il faut avoir le calendrier pour avoir les dates et le display des voitures également
                        }

            {voitures.map((car, index) => (
                            <div onClick={()=>changeVoiture(car)}>
                              <AnimationCarteCar //nouvel objet qui anime la carte voiture (ça commençait à devenir trop compliqué)
                                key={index}
                                car={car}
                                index={index}
                                isInitiallyVisible={false}
                                
                              />
                              </div>
                            ))} 
                                      
            <button onClick={()=>modifyBooking(Booking)}> Modifier la réservation</button>
        </form>

        
        </>
    )
}


function modifyBooking(Booking){

    const modify= async () =>{
        try {
            const response = await fetch(domaine + "api/bookings/modify", {
                method: "POST",
                headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                  "Content-Type": "application/json",
                  'X-CSRF-Token': csrfToken,
                },
                credentials: 'include',
                body:JSON.stringify(Booking)
                
              });
            if (response.ok){
                navigate("/")
                
                return null;
            }
            

            

        } catch (err){
            console.error("Erreur lors de la vérification du login :",err)


        }
    }
    modify();
}