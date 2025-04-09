import "./Car.css"
import { useNavigate } from "react-router";
import { useVar } from '../Contexts/VariablesGlobales.js';
import { useEffect, useState } from "react";


export default function Car({car}){
    const navigate=useNavigate()
    const {voitureSelectionnee,setVoitureSelectionnee}=useVar()
    const {marque, modele, prix, imageURL, carburant, transmission, description } = car
    //const carId=car._id //pour Anaïs, qu'elle sache comment trouver l'ID
    const[charge,setCharge]=useState(false)
    useEffect(()=>{
      if (charge && voitureSelectionnee){
        
        navigate("/cars/location")
      }
      setCharge(true)

    },[voitureSelectionnee,navigate])


    return(
      <div className="flex justify-center items-center h-full">
  <div
    className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 group cursor-pointer"
    onClick={() => handleClickReserve(car, setVoitureSelectionnee)}
  >
    {/* Image plein écran */}
    <img
      src={imageURL}
      alt={`${marque} ${modele}`}
      className="w-full h-full object-cover"
    />

    {/* Overlay foncé en bas */}
    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-4">
      <h1 className="text-xl font-bold">{marque} {modele}</h1>
      <p className="text-sm text-gray-200">{carburant}</p>
      <p className="text-sm mt-1 line-clamp-2">{description}</p>
      <p className="text-lg font-bold text-orange-400 mt-2">{`Dès ${prix} €`}</p>
    </div>

    {/* Bouton flottant en overlay, visible uniquement au hover */}
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={() => handleClickReserve(car, setVoitureSelectionnee)}
        className="bg-black/80 text-white px-4 py-2 rounded-full text-sm hover:bg-black"
      >
        Réserver
      </button>
    </div>
  </div>
</div>

    

    )


}

function handleClickReserve(car,setVoitureSelectionnee,){
  setVoitureSelectionnee(car)
}