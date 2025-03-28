import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import { useVar } from "../Contexts/VariablesGlobales";

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
      <div className="Booking-list">
          <h2> {a} </h2>
        <table>
          <thead>
              <tr>
                  
                  <th>Date de Début </th>
                  <th>Date de fin </th>
                  
                  <th>Voiture réservée</th>
              </tr>
  
          </thead>
          <tbody>
              {bookings.map((booking)=>(
                  <Booking booking={booking} />
  
  
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
    return (<div> {a}</div>)
  }
  }
  

  
export default function SeeAllBookings(){
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
  const {ProtocoleEtDomaine}=useVar()
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

        } catch (err){
            console.log("Erreur lors du chargement des locations :",err)


        }
    }
    fetchBookings();},
    [] 
)
  return (
    <SeeBookings bookings={bookings} a_moi={false} />
  )


}

export function SeeUserBookings(){
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();

  const [bookings, setbookings] = useState([]);
  const {ProtocoleEtDomaine}=useVar()
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

        } catch (err){
            console.log("Erreur lors du chargement des locations :",err)


        }
    }
    fetchBookings();},
    [] 
)
  return (<SeeBookings bookings={bookings} a_moi={true}/>)
}

//présentejuste les bookings 
function Booking(booking){
  return (
    <tr>
                      <td>{booking.dateDebut} </td>
                      <td>{booking.dateFin}</td>
                      
                      <td>{booking.voitureReservee.marque + booking.voitureReservee.modele} </td>
                  </tr>
  )
}

