import Car from "./Car"
import "./Cars.css"
import { useCSRF } from "../Contexts/CsrfContext";
import { useState, useEffect } from "react";
import Fond from '../utile/style.jsx';
import { useVar } from "../Contexts/VariablesGlobales.js";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';


export default function Cars(){
    //récupérer les voitures quelque part
    const {csrfToken}= useCSRF();
    const [Voitures, setVoitures] = useState([]);
    const {ProtocoleEtDomaine}=useVar()
    const [isLoaded, setIsLoaded] = useState(false);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const largeur=window.innerWidth
    var initialVisibleCount
    if (largeur>=1280){ //tout ce bloc doit être cohérent avec Tailwind
        initialVisibleCount= 4;
    }else{
        if (largeur>=768){
            initialVisibleCount=3
        } else{
            if (largeur>=640){
                initialVisibleCount=2

            }else{
                initialVisibleCount=1
            }
        }
    }
    
     
    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 200); // Petit délai pour un effet fluide
    }, []);
    useEffect(()=>{
        const requete= async () =>{
            try {
                const response = await fetch(ProtocoleEtDomaine+"api/cars", {
                    method: "GET",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include', 
                  });
                if (response.ok){
                    const {voitures} = await response.json()
                    setVoitures(voitures)
                }
            } catch (err){
                console.error("Erreur lors de la vérification du login :",err)
            }
        }
        requete();
    }, []);
    
    if (Voitures && Voitures.length>0){
        
        return (
            <Fond>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50">
                {Voitures.map((car, index) => (
                  <AnimationCarteCar //nouvel objet qui anime la carte voiture (ça commençait à devenir trop compliqué)
                    key={index}
                    car={car}
                    index={index}
                    isInitiallyVisible={index < initialVisibleCount}
                  />
                ))}
              </div>
            </Fond>
          );
        }

    else{
        return(
            <Fond>
            <h1>Il n'y a aucune voiture pour le moment</h1>
            </Fond>
        )
    }
    
}

export const AnimationCarteCar = ({ car, index, isInitiallyVisible }) => {
    const [ref, inView] = useInView({
      triggerOnce: true, //l'animation ne se fait qu'une fois
      threshold: 0.1 //considéré visible dès que 10% de sa surface devrait être visible
    });
  
    return (
      <motion.div
        ref={ref} //on attache l'élément motion à l'élément qui sera réellement créé dans le DOM
        initial={{ 
          opacity: 0,
          x: isInitiallyVisible ? -50 : 0, //si on peut le voir au départ, on déroule de gauche à droite
          y: !isInitiallyVisible ? 50 : 0 //sinon de bas en haut
        }}
        animate={inView ? { 
          opacity: 1, 
          x: 0, 
          y: 0 
        } : {}}
        transition={{ 
          duration: 0.5, 
          delay: isInitiallyVisible ? index * 0.1 : 0 //si les voitures sont les premières, on delay leur apparition, sinon non 
        }}
      >
        <Car car={{ //enfin on affiche la voiture (le plus important après tout)
          marque: car.marque,
          modele: car.modele,
          prix: car.prix,
          ImageUrl: car.imageURL,
          carburant: car.carburant,
          transmission: car.transmission,
          description: car.description
        }} />
      </motion.div>
    );
  };


