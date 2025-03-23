import Car from "./Car"
import "./Cars.css"
import { useCSRF } from "../Contexts/CsrfContext";
import { useState, useEffect } from "react";

export default function CarPage({car}){
    const {marque, modele, prix, ImageUrl, carburant, transmission, description } = car
    return(
        <div className="PageVoiture">
            <h1 className="Titre_Page_voiture">{modele + marque}</h1>
            <div className="Page_voiture_description">
                carburant :{carburant}, transmission : {transmission} <br />
                {description}
                Pour seulement {prix}€
            </div>
            <div className="Réservation">
                <p>Vous pouvez réserver dès maintenant ! </p>
            </div>
        </div>
    )//dans le div réservation, mettre un objet type calendrier
}
