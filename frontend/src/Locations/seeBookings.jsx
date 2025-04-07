import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import { useVar } from "../Contexts/VariablesGlobales";
import DeleteBooking from "./DeleteBooking";

function SeeBookings({ bookings, a_moi }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-gray-500 text-lg">
        {a_moi ? "Vous n'avez aucune réservation" : "Il n'y a aucune réservation"}
      </div>
    );
  }

  const titre = a_moi ? "Mes réservations" : "Réservations";

  return (
    <div className="Booking-list bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center sm:text-left">{titre}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[600px] table-auto w-full border border-gray-200 text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-left text-sm sm:text-base">
              <th className="px-2 py-2 md:px-4 border">Début</th>
              <th className="px-2 py-2 md:px-4 border">Fin</th>
              <th className="px-2 py-2 md:px-4 border">Voiture</th>
              <th className="px-2 py-2 md:px-4 border">Supprimer</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <Booking
                key={booking._id}
                dateDebut={booking.dateDebut}
                dateFin={booking.dateFin}
                voitureReservee={booking.voitureReservee}
                idBooking={booking._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



  
export default function SeeAllBookings(){
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
  const {ProtocoleEtDomaine,loadBookings,setLoadBooking}=useVar()
  const [bookings, setbookings] = useState([]);

  useEffect(() => {
    if (!isLoaded) { //si on n'a pas le jeton csrf, on le reprend (c'est du bidouillage, on devrait toujours l'avoir)
      fetchCSRFToken();
    }
  }, [isLoaded, fetchCSRFToken]);
  useEffect(()=>{ //on récupère les bookings
    const fetchBookings= async () =>{
        try {
            const response = await fetch(ProtocoleEtDomaine+"api/bookings/seeAll", {
                method: "GET",
                headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                  "Content-Type": "application/json",
                  'X-CSRF-Token': csrfToken,
                },
                credentials: 'include',
                
              });
            const temp=await response.json()
            setbookings(temp.bookings)
            setLoadBooking(false)


        } catch (err){
            console.log("Erreur lors du chargement des locations :",err)


        }
    }
    
      fetchBookings();
    
    },
    [loadBookings,setLoadBooking] 
)
  return (
    <SeeBookings bookings={bookings} a_moi={false} />
  )


}
//affiche les bookings confirmés seulement
export function SeeUserBookings(){
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
  console.log("affiche User Booking")
  const [bookings, setbookings] = useState([]);
  const {ProtocoleEtDomaine,loadBookings,setLoadBooking}=useVar()
  useEffect(() => {
    if (!isLoaded) { //si on n'a pas le jeton csrf, on le reprend (c'est du bidouillage, on devrait toujours l'avoir)
      fetchCSRFToken();
    }
  }, [isLoaded, fetchCSRFToken]);
  useEffect(()=>{ //on récupère les bookings
    const fetchBookings= async () =>{
        try {
            const response = await fetch(ProtocoleEtDomaine+"api/bookings/seeConfirmed", {
                method: "GET",
                headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                  "Content-Type": "application/json",
                  'X-CSRF-Token': csrfToken,
                },
                credentials: 'include',
                
              });
            const temp=await response.json()
            setbookings(temp.bookings)
            setLoadBooking(false)

        } catch (err){
            console.log("Erreur lors du chargement des locations :",err)


        }
    }
      fetchBookings();
    
    },
    [loadBookings,setLoadBooking] 
)
  return (<SeeBookings bookings={bookings} a_moi={true}/>)
}

//présentejuste les bookings 
function Booking({ dateDebut, dateFin, voitureReservee, idBooking }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const jour = String(date.getDate()).padStart(2, '0');
    const mois = date.toLocaleString('fr-FR', { month: 'long' });
    const annee = date.getFullYear();
    const heures = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Le ${jour} ${mois.charAt(0).toUpperCase() + mois.slice(1)} ${annee} à ${heures}h${minutes}`;
  };

  return (
    <tr className="text-sm sm:text-base">
      <td className="px-2 py-2 md:px-4 border">{formatDate(dateDebut)}</td>
      <td className="px-2 py-2 md:px-4 border">{formatDate(dateFin)}</td>
      <td className="px-2 py-2 md:px-4 border text-center">{voitureReservee.marque} {voitureReservee.modele}</td>
      <td className="px-2 py-2 md:px-4 border text-center">
        <DeleteBooking idBooking={idBooking} />
      </td>
    </tr>
  );
}

