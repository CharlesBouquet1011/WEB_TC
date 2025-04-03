import { useNavigate } from "react-router";
import { useCSRF } from "../Contexts/CsrfContext";
import { useVar } from "../Contexts/VariablesGlobales";
import { useAuth } from "../Contexts/Authenticated";
export default function Logout(){
    const {csrfToken}= useCSRF();
    const navigate=useNavigate()
    const {ProtocoleEtDomaine}=useVar()
    const {triedLogging,setTriedLogging}=useAuth()
    
    return(
        <button
      className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
      onClick={() =>logout(csrfToken,navigate,ProtocoleEtDomaine,triedLogging,setTriedLogging)}
    >
      Se déconnecter
    </button>
    
    )
}


function logout(csrfToken,navigate,proto,triedLogging,setTriedLogging){
    //on se déconnecte

    const deconnexion= async () =>{
            try {
                const response = await fetch(proto+"api/security/logout", {
                    method: "POST",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include',
                    
                  });
                if (response.ok){
                    setTriedLogging(!triedLogging)
                    navigate("/")
                    
                    return null;
                }
                
    
                
    
            } catch (err){
                console.error("Erreur lors de la vérification du login :",err)
    
    
            }
        }
        deconnexion();
    }