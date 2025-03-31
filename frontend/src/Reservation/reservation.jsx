import Switch from '../utile/bouton_login.jsx';
import {Fond,Menu} from '../utile/style_home.jsx';
import {useLocation} from "react-router";
import { useVar } from '../Contexts/VariablesGlobales.js';
import {DatePicker} from 'react-datepicker' 
import "react-datepicker/dist/react-datepicker.css"; // Don't forget the CSS


function Reservation(){
  const {voitureSelectionnee}=useVar()
  console.log(useVar())
  console.log("Voiture sélectionnée :",voitureSelectionnee)
  if (!voitureSelectionnee){
    return(<div>
      Veuillez sélectionner une voiture au préalable
    </div>)
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