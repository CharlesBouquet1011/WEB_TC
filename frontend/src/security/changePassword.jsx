import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import Fond from '../utile/style.jsx';
import { useNavigate } from "react-router";
import { useVar } from "../Contexts/VariablesGlobales.js";
import { handleChange,verifMotDePasse,contientPasMajetMin } from "./registration.jsx";

export function ChangePasswordForm(){
    const navigate=useNavigate()
    
    const {csrfToken}=useCSRF()
    const [Password,setPassword]=useState('')
    const [NewPassword,setNewPassword]=useState("")
    const [CNewPassword,setCNewPassword]=useState("") //confirmation du nouveau mot de passe
    const {ProtocoleEtDomaine}=useVar()
    const [erreurs,setErreurs]=useState({grosseErreur:"",CNewPasswordErreur:"",PasswordErreur:"",NewPasswordErreur:""})
    const [isErreur,setIsErreur]=useState(false) //sert à définir s'il y a eu une erreur
    const handleEnterKey = (event,csrfToken,setErreurs,champs,navigate,ProtocoleEtDomaine,isErreur,setIsErreur) =>{
        if (event.key==="Enter"){
          event.preventDefault()
          console.log(champs)
          submit(csrfToken, setErreurs,champs, navigate,ProtocoleEtDomaine,isErreur,setIsErreur)
        }
      }
    
    useEffect(()=>{
        checkErreurs(Password,NewPassword,CNewPassword,setErreurs,ProtocoleEtDomaine,csrfToken,setIsErreur)
        setIsErreur(false)

    },[Password,NewPassword,CNewPassword])
    useEffect(()=>{
      setErreurs(etatPrec=>({
        ...etatPrec,
        PasswordErreur:""
      }))
    },[Password])
    
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
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,ProtocoleEtDomaine,isErreur,setIsErreur)}
    
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
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,ProtocoleEtDomaine,isErreur,setIsErreur)}
    
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
                        onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,ProtocoleEtDomaine,isErreur,setIsErreur)}
    
                      />
                      {erreurs.CNewPasswordErreur && <small className="text-danger">{erreurs.CNewPasswordErreur}</small>}
                    </div>
    
                    <button 
                      type="button" 
                      className="btn btn-dark w-100 mt-3"
                      onClick={() => submit(csrfToken, setErreurs, [ Password, NewPassword,CNewPassword], navigate,ProtocoleEtDomaine,isErreur,setIsErreur)}
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



//renvoie vrai s'il y a une erreur
function checkErreursSubmit(Password,NewPassword,CNewPassword,ProtocoleEtDomaine,csrfToken,setErreurs,setIsErreur){
    
    if (Password.length>0 && NewPassword.length>0 && CNewPassword.length>0){
        checkErreurs(Password,NewPassword,CNewPassword,setErreurs,ProtocoleEtDomaine,csrfToken,setIsErreur)
        checkPassword(Password,setErreurs,setIsErreur)
    }
    
    else{
        setErreurs(etatPrec=>({
            ...etatPrec,
            grosseErreur:"Veuillez remplir tous les champs",}
          ))
       setIsErreur(true)
    }
    
}
function checkErreurs(Password,NewPassword,CNewPassword,setErreurs,ProtocoleEtDomaine,csrfToken,setIsErreur){
    
    if (Password==NewPassword   && Password.length>0 && NewPassword.length>0){
        setErreurs(etatPrec=>({
            ...etatPrec,
            NewPasswordErreur:"Votre nouveau mot de passe correspond à l'ancien",}
          ))
        setIsErreur(true)
        
    }
    else{
      setErreurs(etatPrec=>({
        ...etatPrec,
        NewPasswordErreur:"",}
      ))
    }

    
    if (NewPassword!=CNewPassword && CNewPassword.length>0 && NewPassword.length>0){
        setErreurs(etatPrec=>({
            ...etatPrec,
            CNewPasswordErreur:"Votre nouveau mot de passe ne correspond pas à sa confirmation",}
          ))
        setIsErreur(true)
        
    }
    else{
      setErreurs(etatPrec=>({
        ...etatPrec,
        CNewPasswordErreur:"",}
      ))
    }
    if (NewPassword.length>0){
      checkPassword(NewPassword,setErreurs,setIsErreur)
    }

}

function checkPassword(formPassword,setErreurs,setIsErreur){
    if (formPassword.length<10){
      setErreurs(etatPrec=>({
        ...etatPrec,
        NewPasswordErreur:"Veuillez rentrer au minimum 10 caractères"
      }))
    }
    else{
      
    if (contientPasMajetMin(formPassword) ){
      setErreurs(etatPrec=>({
        ...etatPrec,
        NewPasswordErreur:"Veuillez mettre des majuscules et des minuscules dans votre nouveau mot de passe",}
      ))
      setIsErreur(true)
    }
    else{
      if (!verifMotDePasse(formPassword)){
        setErreurs(etatPrec=>({
          ...etatPrec,
          NewPasswordErreur:"Veuillez mettre des symboles spéciaux (#,_,$,..) et des chiffres dans votre nouveau mot de passe",}
        ))
        setIsErreur(true)
      }
      else{
        setErreurs(etatPrec=>({
          ...etatPrec,
          NewPasswordErreur:"",}
        ))
      }
    }

    }


    

    
}

export default function ButtonChangePassword(){
    
}

function submit(csrfToken, setErreurs, champs, navigate,ProtocoleEtDomaine,isErreur,setIsErreur){
  const [Password,NewPassword,CNewPassword]=champs
  checkErreursSubmit(Password,NewPassword,CNewPassword,ProtocoleEtDomaine,csrfToken,setErreurs,setIsErreur)
  const request= async () =>{
    try {
        const response = await fetch(ProtocoleEtDomaine+"api/security/changePassword", {
            method: "POST",
            headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
              "Content-Type": "application/json",
              'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
            body: JSON.stringify({oldPassword:Password,newPassword:NewPassword})
            
          });
        if (response.ok){
            const {isEqual} = await response.json()
            if (!isEqual){
                setErreurs(etatPrec=>({
                    ...etatPrec,
                    PasswordErreur:"Votre mot de passe est incorrect",}
                  ))
            }
            
            return false;
        }
        
        

        

    } catch (err){
        console.error("Erreur lors de la vérification du login :",err)
        return true

    }
}
  if (!isErreur){
    request()
  }
  setIsErreur(false)


  
 ;
}