import React, { createContext, useState, useContext } from 'react';

const VarContext = createContext();

export function VarProvider({children}){
    const [voitureSelectionnee,setVoitureSelectionnee]=useState(null) //pour afficher et choisir la voiture à louer
    const [erreurLogin,setErreurLogin]=useState("")
    const [redirectAfterLogin,setRedirectAfterLogin]=useState("/user")
    const [idBooking,setIdBooking]=useState(null)
    const [loadBookings,setLoadBooking]=useState(true)
        
        return(
            <VarContext.Provider value={{voitureSelectionnee,setVoitureSelectionnee,erreurLogin,setErreurLogin,redirectAfterLogin,setRedirectAfterLogin,
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