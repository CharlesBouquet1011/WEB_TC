import React, { createContext, useState, useContext } from 'react';
const CSRFContext = createContext();

export function CSRFProvider({children}) {
  const [csrfToken, setCsrfToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // Fonction à appeler uniquement quand vous avez besoin du token
  //remaniement pour vérifier si le jeton est en train de load ou est déjà chargé pour ne pas charger énormément de jetons différents
  const fetchCSRFToken = async () => {
    if (isLoaded || isLoading) return csrfToken;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/security/csrf-token", { //comme avant
        credentials: 'include' //pour le cookie
      });
      const data = await response.json();
      setCsrfToken(data.csrfToken);
      setIsLoaded(true);
      return data.csrfToken;
    } catch (err) {
      console.error("erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (//on donne tous les attributs dont on pourrait avoir besoin dans le useCSRF (setCsrfToken est assez improbable) 
    <CSRFContext.Provider value={{ csrfToken, setCsrfToken, fetchCSRFToken, isLoading, isLoaded }}> 
      {children}
    </CSRFContext.Provider>
  );
}

export function useCSRF(){
    const context = useContext(CSRFContext); //renvoie les valeurs qui sont définies dans le html au dessus à l'aide de CSRFContext.Provider value=...
  if (!context) {
    throw new Error('useCSRF doit être utilisé à l\'intérieur du CSRFProvider');
  }
  return context;
}