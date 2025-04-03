import React, { createContext, useState, useContext } from 'react';

const VarContext = createContext();

export function VarProvider({children}){
    const [ProtocoleEtDomaine, setProtocoleEtDomaine] = useState("http://localhost/")
    const [voitureSelectionnee,setVoitureSelectionnee]=useState(null) //pour afficher et choisir la voiture à louer
    const [erreurLogin,setErreurLogin]=useState("")
        
        
        return(
            <VarContext.Provider value={{ProtocoleEtDomaine,voitureSelectionnee,setVoitureSelectionnee,erreurLogin,setErreurLogin}}>
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