import Switch from '../utile/bouton_login.jsx';
import {Fond,Menu} from '../utile/style_home.jsx';
import Assistance from "../Locations/Assistance.jsx"
import { useVar } from '../Contexts/VariablesGlobales.js';


export default function Home(){
    const {ProtocoleEtDomaine}=useVar()
    return(
        <div>
        <Menu/>
        <Fond>
        <div className="App">
        <div className="video-container">
        <video autoPlay loop muted playsInline className="background-video">
         <source src={ProtocoleEtDomaine+"media/image/video.mp4"} type="video/mp4" />
            Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
        <Switch classe={"profil"} page={"/login"} texte={"connexion"} />
        <div className="overlay">
            <h1>Driving Enhanced</h1>
        </div>
        </div>
        <h2>Driving Enhanced – L'Élégance et la Puissance au Bout des Doigts</h2>
        <p className="text-center mx-auto w-50">Vivez une expérience de conduite inégalée avec Driving Enhanced, votre référence en location de voitures de luxe. Que ce soit pour un voyage d’affaires, un événement spécial ou simplement pour le plaisir, notre flotte d’exception vous garantit style, confort et performance. Prenez le volant. Dominez la route. Luxe, prestige et sensations fortes vous attendent.
        <br/><br/>
        Nous offrons un <strong>service de location haut de gamme</strong> avec une sélection exclusive de voitures de prestige, adaptées à toutes vos envies.  
        Besoin d’un modèle spécifique ? Notre <strong>service de sourcing</strong> trouve pour vous le véhicule de vos rêves, où qu'il soit.  
        Et pour une prise en charge complète, nous assurons le <strong>transport sécurisé</strong> de votre voiture partout en Europe.  
        <br/><br/>
        <strong>Exigez l’excellence. Conduisez sans limites.</strong>  
        </p>
      </div>
      </Fond>
      </div>

    )
}

