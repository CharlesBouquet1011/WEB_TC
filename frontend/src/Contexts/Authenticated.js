import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCSRF } from "./CsrfContext";
import { useVar } from './VariablesGlobales';
import {useNavigate} from "react-router";
const AuthContext = createContext();

export function AuthProvider({children}){
    const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
    const [logged, setlogged] = useState(false)
    const [triedLogging,setTriedLogging] = useState(false)
    const {ProtocoleEtDomaine}=useVar()
    const [loading,setLoading]=useState(true)
    
    useEffect(() => {
        if (!isLoaded) { //si on n'a pas le jeton csrf, on le reprend (c'est du bidouillage, on devrait toujours l'avoir)
          fetchCSRFToken();
        }
      }, [isLoaded, fetchCSRFToken]);
    
     useEffect(()=>{ //vérifie si l'utilisateur est connecté
        const isLogged= async () =>{
            try {
                const response = await fetch(ProtocoleEtDomaine+"api/security/logged", {
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
            finally{
                setLoading(false)
            }
        }
        isLogged()
        setTriedLogging(false)
        
        ;},
        [triedLogging,csrfToken] 
    )
        
        
        return(
            <AuthContext.Provider value={{logged,setlogged,triedLogging,setTriedLogging,loading}}>
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
    const {logged,loading} = useAuth()
    const navigate=useNavigate()
    const {setErreurLogin}=useVar()
    console.log("Logged" , logged)
    if (loading){
        return null
    }
    if (logged){
        return(
            <>
                {children}
            </>
        )
    }
    else{
        setErreurLogin("Veuillez vous connecter pour accéder à cette page")
        navigate("/login")
        console.log("Pas connecté")
        return null
    }
}
