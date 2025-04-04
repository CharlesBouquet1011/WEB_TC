import Switch from '../utile/bouton_login.jsx';
import {Fond,Menu} from '../utile/style_home.jsx';
import { useVar } from '../Contexts/VariablesGlobales.js';
import { useNavigate } from "react-router-dom";



export default function Home(){
    const {ProtocoleEtDomaine}=useVar()
    const navigate = useNavigate();
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
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
          <button
            onClick={() => navigate("/cars")}
            className="relative px-6 py-3 text-white rounded-lg text-center overflow-hidden group w-48 h-16"
            >
            <img
                src={ProtocoleEtDomaine + "media/image/icone1.jpg"}
                alt="Nos Voitures"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition"
            />
            <span className="relative z-10 font-semibold">Nos Voitures</span>
          </button>
          <button onClick={() => navigate("/services")} className="px-6 py-3 bg-gray-800 text-white rounded-lg text-center hover:bg-black transition">Nos Services</button>
          <button onClick={() => navigate("/contact")} className="px-6 py-3 bg-gray-800 text-white rounded-lg text-center hover:bg-black transition">Nous Contacter</button>
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

