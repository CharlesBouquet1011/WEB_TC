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
        <button 
        className="absolute top-4 right-5 z-10 shadow-md hover:scale-105 transition-transform"
        onClick={() => navigate("/login")}
        >
        <img
            src={ProtocoleEtDomaine + "media/image/profil.png"}
            alt="Profil"
            className="w-10 h-10"
        />
    </button>
        <div className="overlay">
            <h1>Driving Enhanced</h1>
        </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10 mb-10">
          <button
            onClick={() => navigate("/cars")}
            className="relative w-80 h-60 rounded-xl overflow-hidden group"
            >
            <img
                src={ProtocoleEtDomaine + "media/image/icone1.jpg"}
                alt="Nos Voitures"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-35 transition"
            />
            <div className="absolute bottom-0 w-full text-center pb-2">
            <span className="text-white text-lg font-semibold">Nos Voitures</span>
            </div>
          </button>
          <button
            onClick={() => navigate("/services")}
            className="relative w-80 h-60 rounded-xl overflow-hidden group"
            >
            <img
                src={ProtocoleEtDomaine + "media/image/icone4.jpg"}
                alt="Nos Services"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-35 transition"
            />
            <div className="absolute bottom-0 w-full text-center pb-2">
            <span className="text-white text-lg font-semibold">Nos Services</span>
            </div>
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="relative w-80 h-60 rounded-xl overflow-hidden group"
            >
            <img
                src={ProtocoleEtDomaine + "media/image/icone3.jpg"}
                alt="Nous Contacter"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-35 transition"
            />
            <div className="absolute bottom-0 w-full text-center pb-2">
            <span className="text-white text-lg font-semibold">Nous Contacter</span>
            </div>
          </button>
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

