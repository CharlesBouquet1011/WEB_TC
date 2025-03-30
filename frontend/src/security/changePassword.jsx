import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import Fond from '../utile/style.jsx';
import { useNavigate } from "react-router";
import { useVar } from "../Contexts/VariablesGlobales.js";

export default function ChangePassword(){
    const {csrfToken}=useCSRF()
    const [Password,setPassword]=useState('')
    const [NewPassword,setNewPassword]=useState("")
    const [CNewPassword,setCNewPassword]=useState("") //confirmation du nouveau mot de passe
    const {ProtocoleEtDomaine}=useVar()
    const [erreurs,setErreurs]=useState({grosseErreur:"",CNewPasswordErreur:"",PasswordErreur:"",NewPasswordErreur:""})
    const handleEnterKey = (event,csrfToken,setErreurs,champs,navigate,ProtocoleEtDomaine) =>{
        if (event.key==="Enter"){
          event.preventDefault()
          submit(csrfToken, setErreurs, champs, navigate,ProtocoleEtDomaine)
        }
      }
    
    useEffect(()=>{
        checkErreurs(Password,NewPassword,CNewPassword,setErreurs)


    },[Password,NewPassword])
}



function checkErreursSubmit(Password,NewPassword,CNewPassword,setErreurs){

    if (Password.length>0 && NewPassword.length>0 && CNewPassword.length>0){
        checkErreurs(Password,NewPassword,CNewPassword,setErreurs)
    }
    else{
        setErreurs(etatPrec=>({
            ...etatPrec,
            grosseErreur:"Veuillez remplir tous les champs",}
          ))
    }
}
function checkErreurs(Password,NewPassword,CNewPassword,setErreurs){
    
    if (Password==NewPassword   && Password.length>0 && NewPassword.length>0){
        setErreurs(etatPrec=>({
            ...etatPrec,
            NewPasswordErreur:"Votre nouveau mot de passe correspond à l'ancien",}
          ))
        checkPassword(Password,setErreurs)
    }
    if (NewPassword!=CNewPassword && CNewPassword.length>0 && NewPassword.length>0){
        setErreurs(etatPrec=>({
            ...etatPrec,
            CNewPasswordErreur:"Votre nouveau mot de passe ne correspond pas à sa confirmation",}
          ))
        
    }

}

function checkPassword(formPassword,setErreurs){
    const request= async () =>{
        try {
            const response = await fetch(ProtocoleEtDomaine+"api/security/ispassword", {
                method: "POST",
                headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                  "Content-Type": "application/json",
                  'X-CSRF-Token': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({password:formPassword})
                
              });
            if (response.ok){
                const {isEqual} = await response.json()
                if (isEqual){
                    setErreurs(etatPrec=>({
                        ...etatPrec,
                        PasswordErreur:"Votre mot de passe est incorrect",}
                      ))
                }
                
                return null;
            }
            
            

            

        } catch (err){
            console.error("Erreur lors de la vérification du login :",err)


        }
    }
    request();
}
