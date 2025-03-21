import { useNavigate } from "react-router";
import { useCSRF } from "../Contexts/CsrfContext";
export default function DeleteAccount(){
    const {csrfToken}= useCSRF();
    const navigate=useNavigate()


    return(
    <button onClick={() =>accountDeletion(csrfToken,navigate)}>Supprimer mon compte</button>// demander une confirmation
    )
}


function accountDeletion(csrfToken,navigate){
    //on se déconnecte
    const deletion= async () =>{
            try {
                const response = await fetch("http://localhost:3000/api/security/deleteAccount", {
                    method: "POST",
                    headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                      "Content-Type": "application/json",
                      'X-CSRF-Token': csrfToken,
                    },
                    credentials: 'include',
                    
                  });
                if (response.ok){
                    navigate("/")
                    
                    return null;
                }
                
    
                
    
            } catch (err){
                console.error("Erreur lors de la vérification du login :",err)
    
    
            }
        }
        deletion();
    }