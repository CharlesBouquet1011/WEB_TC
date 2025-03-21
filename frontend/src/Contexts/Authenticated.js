import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCSRF } from "./CsrfContext";

const AuthContext = createContext();

export function AuthProvider({children}){
    const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
    const [logged, setlogged] = useState(false)
    const [triedLogging,setTriedLogging] = useState(false)

    useEffect(() => {
        if (!isLoaded) { //si on n'a pas le jeton csrf, on le reprend (c'est du bidouillage, on devrait toujours l'avoir)
          fetchCSRFToken();
        }
      }, [isLoaded, fetchCSRFToken]);
    
     useEffect(()=>{ //vérifie si l'utilisateur est connecté
        const isLogged= async () =>{
            try {
                const response = await fetch("http://localhost:3000/api/security/logged", {
                    method: "GET",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include',
                    
                  });
                if (!response.ok){
                    setlogged(false)
                    return null;
                }
                else{
                    setlogged(true)
                }
                

                
    
            } catch (err){
                console.error("Erreur lors de la vérification du login :",err)
    
    
            }
        }
        isLogged()
        setTriedLogging(false)
        ;},
        [triedLogging,csrfToken] 
    )
        
        
        return(
            <AuthContext.Provider value={{logged,setlogged,triedLogging,setTriedLogging}}>
                {children}
            </AuthContext.Provider>
        )
}

export function useAuth(){
    const context=useContext(AuthContext)
    if (!context){
        throw new Error('useCSRF doit être utilisé à l\'intérieur du AuthProvider');
    }
    return context

}
//permet de ne donner accès aux enfants seulement si l'on est connecté
export default function Logged({children}){
    const {logged} = useAuth()
    if (logged){
        return(
            <>
                {children}
            </>
        )
    }
    else{
        return(
            <h1>
                Veuillez vous connecter
            </h1>
        )
    }
}
