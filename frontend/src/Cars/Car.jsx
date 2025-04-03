import "./Car.css"
import { useNavigate } from "react-router";
import { useVar } from '../Contexts/VariablesGlobales.js';
import { useEffect, useState } from "react";


export default function Car({car}){
    const navigate=useNavigate()
    const {voitureSelectionnee,setVoitureSelectionnee}=useVar()
    const {marque, modele, prix, ImageUrl, carburant, transmission, description } = car
    const[charge,setCharge]=useState(false)
    useEffect(()=>{
      console.log("UseEffect")
      if (charge && voitureSelectionnee){
        
        navigate("/cars/location")
      }
      setCharge(true)

    },[voitureSelectionnee,navigate])


    return(
        <div className="relative w-80 rounded-2xl overflow-hidden shadow-xl bg-white transition-transform transform hover:scale-105">
  {/* Image */}
  <div className="w-full h-64 overflow-hidden">
    <img src={ImageUrl} alt={`${marque} ${modele}`} className="w-full h-full object-cover" />
  </div>

  {/* Encadré sombre en haut */}
  <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
    <h1 className="text-3xl font-bold">{marque}</h1>
  </div>

  {/* Contenu texte */}
  <div className="p-4">
    <h2 className="text-xl font-semibold">{modele} ({carburant})</h2>
    <p className="text-sm text-gray-700 mb-4">{description}</p>
    <p className="text-lg font-bold text-black">{`À partir de ${prix} €`}</p>
  </div>

  {/* Boutons */}
  <div className="flex flex-col p-4 bg-gray-100">
    <button className="bg-black text-white py-2 px-4 rounded-lg mb-2 hover:bg-gray-800" onClick={()=>handleClickReserve(car,setVoitureSelectionnee)}>
      Réserver le {modele}
    </button>
    <button className="border border-black text-black py-2 px-4 rounded-lg hover:bg-gray-200">
      Tous les modèles {modele}
    </button>
  </div>
</div>

    )


}

function handleClickReserve(car,setVoitureSelectionnee,){
  console.log("click")
  setVoitureSelectionnee(car)
}