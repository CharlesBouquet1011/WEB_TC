import { useState, useEffect } from "react";
import { useCSRF } from '../../Contexts/CsrfContext.js';

export function useFetchCars() {
  const {csrfToken}=useCSRF();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des véhicules");
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setCars(data);
        } else if (data && typeof data === 'object') {
          const possibleArrayProps = Object.entries(data)
            .find(([key, value]) => Array.isArray(value));
          
          if (possibleArrayProps) {
            const [key, arrayData] = possibleArrayProps;
            setCars(arrayData);
          } else {
            setCars([data]);
          }
        } else {
          console.error("Unexpected data format:", data);
          setCars([]);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  return { cars, loading, error };
}
