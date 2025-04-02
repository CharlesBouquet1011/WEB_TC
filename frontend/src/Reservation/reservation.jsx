import Switch from '../utile/bouton_login.jsx';
import {Fond,Menu} from '../utile/style_home.jsx';
import {useLocation} from "react-router";
import { useVar } from '../Contexts/VariablesGlobales.js';



function Reservation(){
  const {voitureSelectionnee}=useVar()
  console.log(useVar())
  console.log("Voiture sélectionnée :",voitureSelectionnee)
  if (!voitureSelectionnee){
    return(
        <Fond>
      Veuillez sélectionner une voiture au préalable
      </Fond>)
  }
  else{
    return(
      <Fond>
        Vous avez sélectionné la voiture {voitureSelectionnee.marque}
      </Fond>

    )
  }

    
}

export default Reservation;