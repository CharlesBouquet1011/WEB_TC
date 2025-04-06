import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import { useVar } from "../Contexts/VariablesGlobales";
import { ModifyBookingButton } from "./modifyBooking";
import DeleteBooking from "./DeleteBooking";

function SeeBookings({bookings,a_moi}) { //à tester, je n'ai pas pu débugguer, on a pas encore une 2e page qui nécessite d'être connecté pour être dessus
  //récupérer les jetons csrf etc
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
              <th className="px-4 py-2 border border-gray-200">Modifier la réservation</th>
              <th className="px-4 py-2 border border-gray-200">Supprimer la réservation</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <Booking
                key={booking._id} // Assurez-vous que chaque réservation a un ID unique
                dateDebut={booking.dateDebut}
                dateFin={booking.dateFin}
                voitureReservee={booking.voitureReservee}
                idBooking={booking._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    );//rajouter booking._id pour récupérer l'ID et ajouter le bouton pour supprimer ?
  }//mettre la requête dans un autre composant pour pouvoir avoir un seebooking by user et pour tout le monde ?
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
function Booking({ dateDebut, dateFin, voitureReservee,idBooking }) {
  console.log("id Booking (Booking):", idBooking)
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
    <tr>
      <td className="px-4 py-2 border border-gray-200">{formatDate(dateDebut)}</td>
      <td className="px-4 py-2 border border-gray-200">{formatDate(dateFin)}</td>
      <td className="px-4 py-2 border border-gray-200">
        {voitureReservee.marque + " " + voitureReservee.modele}
      </td>
      <td>
      <ModifyBookingButton idBooking={idBooking} />
      </td>
      <td>
      <DeleteBooking idBooking={idBooking} />
      </td>

    </tr>
  );
}

