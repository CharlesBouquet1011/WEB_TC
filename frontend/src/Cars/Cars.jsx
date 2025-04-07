import Car from "./Car";
import "./Cars.css";
import { useCSRF } from "../Contexts/CsrfContext";
import { useState, useEffect } from "react";
import Fond from "../utile/style.jsx";
import { useVar } from "../Contexts/VariablesGlobales.js";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Cars() {
  const { csrfToken } = useCSRF();
  const [Voitures, setVoitures] = useState([]);
  const { ProtocoleEtDomaine } = useVar();
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState({
    marque: "",
    nb_places: "",
    prixMax: "",
  });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const largeur = window.innerWidth;
  let initialVisibleCount;
  if (largeur >= 1280) {
    initialVisibleCount = 4;
  } else if (largeur >= 768) {
    initialVisibleCount = 3;
  } else if (largeur >= 640) {
    initialVisibleCount = 2;
  } else {
    initialVisibleCount = 1;
  }

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200); // Petit délai pour un effet fluide
  }, []);

  useEffect(() => {
    const requete = async () => {
      try {
        const response = await fetch(
          ProtocoleEtDomaine + "api/cars/filter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken,
            },
            credentials: "include",
            body: JSON.stringify(filters),
          }
        );
        if (response.ok) {
          const { voitures } = await response.json();
          setVoitures(voitures);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des voitures :", err);
      }
    };
    requete();
  }, [filters, csrfToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Fond>
      {/* Formulaire de filtre */}
      <div className="filter-form p-4 bg-gray-200 mb-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Filtres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <input
            type="text"
            name="marque"
            placeholder="Marque"
            value={filters.marque}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="nb_places"
            placeholder="Nombre de places"
            value={filters.nb_places}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="prixMax"
            placeholder="Prix Max"
            value={filters.prixMax}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50">
        {Voitures.length > 0 ? (
          Voitures.map((car, index) => (
            <AnimationCarteCar
              key={index}
              car={car}
              index={index}
              isInitiallyVisible={index < initialVisibleCount}
            />
          ))
        ) : (
          <h1>Aucune voiture ne correspond à votre recherche</h1>
        )}
      </div>
    </Fond>
  );
}

export const AnimationCarteCar = ({ car, index, isInitiallyVisible }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // L'animation ne se fait qu'une fois
    threshold: 0.1, // Considéré visible dès que 10% de sa surface est visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: isInitiallyVisible ? -50 : 0, // Si on peut le voir au départ, on déroule de gauche à droite
        y: !isInitiallyVisible ? 50 : 0, // Sinon de bas en haut
      }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: isInitiallyVisible ? index * 0.1 : 0, // Si les voitures sont les premières, on delay leur apparition
      }}
    >
      <Car car={car} />
    </motion.div>
  );
};
