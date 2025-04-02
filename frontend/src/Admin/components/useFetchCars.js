import { useState, useEffect } from "react";

export function useFetchCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        console.log("Fetching cars from API...");
        const response = await fetch("http://localhost/api/cars");
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des véhicules");
        }
        
        // Log the raw response
        console.log("API Response Status:", response.status);
        
        const data = await response.json();
        console.log("Raw API data:", data);
        
        // Check if data is an array
        if (Array.isArray(data)) {
          setCars(data);
          console.log("Cars set as array:", data);
        } else if (data && typeof data === 'object') {
          // If it's an object, try to find an array property
          const possibleArrayProps = Object.entries(data)
            .find(([key, value]) => Array.isArray(value));
          
          if (possibleArrayProps) {
            const [key, arrayData] = possibleArrayProps;
            console.log(`Found array in property: ${key}`, arrayData);
            setCars(arrayData);
          } else {
            // If no array found, convert object to array if possible
            console.log("No array found in data, using data directly");
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
