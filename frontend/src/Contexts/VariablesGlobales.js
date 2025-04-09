import React, { createContext, useState, useContext } from 'react';

const VarContext = createContext();

export function VarProvider({children}){
<<<<<<< HEAD
    const [ProtocoleEtDomaine, setProtocoleEtDomaine] = useState("http://localhost/") // à modifier (nom de domaine)
    const [voitureSelectionnee,setVoitureSelectionnee]=useState(null) // pour afficher et choisir la voiture à louer
    
        
=======
    const [ProtocoleEtDomaine, setProtocoleEtDomaine] = useState("http://localhost/")
    const [voitureSelectionnee,setVoitureSelectionnee]=useState(null) //pour afficher et choisir la voiture à louer
    const [erreurLogin,setErreurLogin]=useState("")
    const [redirectAfterLogin,setRedirectAfterLogin]=useState("/user")
    const [idBooking,setIdBooking]=useState(null)
    const [loadBookings,setLoadBooking]=useState(true)
>>>>>>> 69e611eca73475c5be1d035283d74094d9083c55
        
        return(
            <VarContext.Provider value={{ProtocoleEtDomaine,voitureSelectionnee,setVoitureSelectionnee,erreurLogin,setErreurLogin,redirectAfterLogin,setRedirectAfterLogin,
                idBooking,setIdBooking,loadBookings,setLoadBooking
            }}>
                {children}
            </VarContext.Provider>
        )
}

export function useVar(){
    const context=useContext(VarContext)
    if (!context){
        throw new Error('useCSRF doit être utilisé à l\'intérieur du VarProvider');
    }
    return context

}