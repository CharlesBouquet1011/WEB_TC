import React, { createContext, useState, useContext, useEffect } from 'react';

const VarContext = createContext();

export function VarProvider({children}){
    const [ProtocoleEtDomaine, setProtocoleEtDomaine] = useState("http://localhost/")

    
        
        
        return(
            <VarContext.Provider value={{ProtocoleEtDomaine}}>
                {children}
            </VarContext.Provider>
        )
}

export function useVar(){
    const context=useContext(VarContext)
    if (!context){
        throw new Error('useCSRF doit être utilisé à l\'intérieur du AuthProvider');
    }
    return context

}