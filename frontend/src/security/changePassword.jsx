import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import Fond from '../utile/style.jsx';
import { useNavigate } from "react-router";
import { useVar } from "../Contexts/VariablesGlobales.js";
import { handleChange } from "./registration.jsx";

export function ChangePasswordForm(){
    const navigate=useNavigate()
    
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
        checkErreurs(Password,NewPassword,CNewPassword,setErreurs,ProtocoleEtDomaine,csrfToken)


    },[Password,NewPassword])
    return (
        
          <>
            
              
    
              {/* Registration Form Section */}
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <div className="w-75">
                  <h2 className="mb-4">Changez votre mot de passe</h2>
                  <p className="text-muted mb-4"></p>
    
                  {/* Large Error Message */}
                  {erreurs.grosseErreur && (
                    <div className="alert alert-danger mb-4" role="alert">
                      {erreurs.grosseErreur}
                    </div>
                  )}
    
                  <form>
                    
    
                    
    
                    
    
                    
    
                    <div className="mb-3">
                      <label htmlFor="oldPassword" className="form-label">Mot de passe</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="oldPassword"
                        onChange={(event) => handleChange(event, setPassword)} 
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,ProtocoleEtDomaine)}
    
                      />
                      {erreurs.PasswordErreur && <small className="text-danger">{erreurs.PasswordErreur}</small>}
                    </div>
    
                    <div className="mb-3">
                      <label htmlFor="Newpassword" className="form-label">Nouveau mot e passe</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="Newpassword"
                        onChange={(event) => handleChange(event, setNewPassword)}
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,ProtocoleEtDomaine)}
    
                      />
                      {erreurs.NewPasswordErreur && <small className="text-danger">{erreurs.NewPasswordErreur}</small>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="CNewPassword" className="form-label">Nouveau mot e passe</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="CNewPassword"
                        onChange={(event) => handleChange(event, setCNewPassword)}
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,ProtocoleEtDomaine)}
    
                      />
                      {erreurs.CNewPasswordErreur && <small className="text-danger">{erreurs.CNewPasswordErreur}</small>}
                    </div>
    
                    <button 
                      type="button" 
                      className="btn btn-dark w-100 mt-3"
                      onClick={() => submit(csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,ProtocoleEtDomaine)}
                    >
                      S'inscrire
                    </button>
                  </form>
                </div>
              </div>
            
          
          <br />
          </>
        )
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
function checkErreurs(Password,NewPassword,CNewPassword,setErreurs,ProtocoleEtDomaine,csrfToken){
    
    if (Password==NewPassword   && Password.length>0 && NewPassword.length>0){
        setErreurs(etatPrec=>({
            ...etatPrec,
            NewPasswordErreur:"Votre nouveau mot de passe correspond à l'ancien",}
          ))
        checkPassword(Password,setErreurs,ProtocoleEtDomaine,csrfToken)
    }
    if (NewPassword!=CNewPassword && CNewPassword.length>0 && NewPassword.length>0){
        setErreurs(etatPrec=>({
            ...etatPrec,
            CNewPasswordErreur:"Votre nouveau mot de passe ne correspond pas à sa confirmation",}
          ))
        
    }

}

function checkPassword(formPassword,setErreurs,ProtocoleEtDomaine,csrfToken){
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

export default function ButtonChangePassword(){
    
}

function submit(){

}