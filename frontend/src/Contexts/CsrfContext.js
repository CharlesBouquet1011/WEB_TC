import React, { createContext, useState, useContext, useEffect } from 'react';
const CSRFContext = createContext();
export function CSRFProvider ({children}){
    
    const [csrfToken, setCsrfToken] = useState('');
      useEffect(()=> {async function fetchCSRFToken(){ //syntaxe nulle comme on peut pas utiliser async/await avec react
        try{
            var response=await fetch("http://localhost:3000/api/csrf-token");
            response=await response.json();
            setCsrfToken(response.csrfToken)
        }
        catch (err) {
            console.error("erreur:" + err)
        }
    
      
      }
      fetchCSRFToken();
    }, []
      
      );
    return(//création d'un contexte pour passer les valeurs à tout ce qui est enveloppé par la fonction
        <CSRFContext.Provider value={{ csrfToken, setCsrfToken }}> 
            {children}
        </CSRFContext.Provider>
    )
}

export function useCSRF(){
    const context = useContext(CSRFContext); //renvoie ce le couple csrfToken, setCsrfToken qui est défini à l'aide de CSRFContext.Provider value=...
  if (!context) {
    throw new Error('useCSRF doit être utilisé à l\'intérieur du CSRFProvider');
  }
  return context;
}