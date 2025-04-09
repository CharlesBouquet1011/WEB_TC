import { useState, useEffect } from "react";
import { useVar } from '../../Contexts/VariablesGlobales.js';
import { useCSRF } from '../../Contexts/CsrfContext.js';

export function useFetchUsers() {
  const {ProtocoleEtDomaine}=useVar();
  const {csrfToken}=useCSRF();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(ProtocoleEtDomaine+"api/security/seeAll");
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des véhicules");
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && typeof data === 'object') {
          const possibleArrayProps = Object.entries(data)
            .find(([key, value]) => Array.isArray(value));
          
          if (possibleArrayProps) {
            const [key, arrayData] = possibleArrayProps;
            setUsers(arrayData);
          } else {
            setUsers([data]);
          }
        } else {
          console.error("Unexpected data format:", data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  return { users, loading, error };
}
