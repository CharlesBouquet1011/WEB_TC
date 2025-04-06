import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import { useVar } from "../Contexts/VariablesGlobales";
import DeleteBooking from "../Locations/DeleteBooking.jsx";

function SeeBookings({bookings,a_moi}) {
  let a

  if (bookings && bookings.length>0){
    if (a_moi){
      a="Mes réservations"
  
    }
    else{
      a="Réservations"
    }
       
    return (
      <div className="Booking-list p-4 bg-gray-100 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{a}</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border border-gray-200">Date de début</th>
              <th className="px-4 py-2 border border-gray-200">Date de fin</th>
              <th className="px-4 py-2 border border-gray-200">Voiture réservée</th>
              <th className="px-4 py-2 border border-gray-200">Prix total</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <Booking
                key={booking.id}
                dateDebut={booking.dateDebut}
                dateFin={booking.dateFin}
                voitureReservee={booking.voitureReservee}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  else {
    if (a_moi){
      a="Vous n'avez aucune réservation"
    }
    else{
      a="Il n'y a aucune réservation"
    }
    return (<div className="text-gray-500 text-lg">{a}</div>)
  }
  }
  

  

export default function SeeUserBookings(){
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();

  const [bookings, setbookings] = useState([]);
  const {ProtocoleEtDomaine}=useVar()
  useEffect(() => {
    if (!isLoaded) { 
      fetchCSRFToken();
    }
  }, [isLoaded, fetchCSRFToken]);
  useEffect(()=>{
    const fetchBookings= async () =>{
        try {
            const response = await fetch(ProtocoleEtDomaine+"api/bookings/see", {
                method: "GET",
                headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                  "Content-Type": "application/json",
                  'X-CSRF-Token': csrfToken,
                },
                credentials: 'include',
                
              });
            const temp=await response.json()
            setbookings(temp.bookings)

        } catch (err){
            console.log("Erreur lors du chargement des locations :",err)


        }
    }
    fetchBookings();},
    [] 
)
  return (<SeeBookings bookings={bookings.filter((b) => !b.validated)} a_moi={true}/>)
}

//présentejuste les bookings 
function Booking({ dateDebut, dateFin, voitureReservee, key }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const jour = String(date.getDate()).padStart(2, '0');
    const mois = date.toLocaleString('fr-FR', { month: 'long' });
    const annee = date.getFullYear();
    const heures = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `Le ${jour} ${mois.charAt(0).toUpperCase() + mois.slice(1)} ${annee} à ${heures}h${minutes}`;
  };
  const calculerNbJours = (start, end) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const nbJours = calculerNbJours(dateDebut, dateFin);
  const prixParJour = voitureReservee.prix;
  const total = nbJours * prixParJour

  return (
    <tr>
      <td className="px-4 py-2 border border-gray-200">{formatDate(dateDebut)}</td>
      <td className="px-4 py-2 border border-gray-200">{formatDate(dateFin)}</td>
      <td className="px-4 py-2 border border-gray-200">
        {voitureReservee.marque + " " + voitureReservee.modele}
      </td>
      <td className="px-4 py-2 border border-gray-200 text-center">{total} €</td>
      <td className="px-4 py-2 border border-gray-200 text-center">
          <DeleteBooking idBooking={key} />
        </td>
    </tr>
  );
}

