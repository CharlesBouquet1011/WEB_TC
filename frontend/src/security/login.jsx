import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/Authenticated";
function Login() {
  //récupérer les jetons csrf etc
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
  const navigate=useNavigate()
 const {triedLogging,setTriedLogging}=useAuth()

  useEffect(() => {
    if (!isLoaded) { //si on n'a pas le jeton csrf, on le reprend (c'est du bidouillage, on devrait toujours l'avoir)
      fetchCSRFToken();
    }
  }, [isLoaded, fetchCSRFToken]);
  
  //mettre un peu de pour ce forms, c'est moche pour l'instant: utiliser la classe du div
  return (
    <div className="Registration-form">
      <h2>Connexion à votre compte</h2>
      <form>
        <label htmlFor="login-email">Mail</label> <br />
        <input type="text" id="login-email" name="login-email" /> <br />
        
        <label htmlFor="login-password">Mot de passe</label> <br /> 
        <input type="password" id="login-password" name="login-password" /> <br />
        
      </form>
      

      <button id="submit" onClick={() => submitr(csrfToken,navigate,triedLogging,setTriedLogging)}> se connecter </button> <br />
      <div className="plainText">Vous n'avez pas de compte ?
        <a href="/register">
          Connectez-vous ici !
        </a>
        

      </div>
    </div>
  );
}


async function submitr(csrfToken,navigate,triedLogging,setTriedLogging){
    
    var email,password
    email=document.getElementById("login-email").value
    password=document.getElementById("login-password").value
    
    try{
        var authentification=await fetch("http://localhost:3000/api/security/login", {
            method:"POST",
            headers:{
                "Content-type":"application/json",
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
            body:JSON.stringify({Email: email, Password: password})




        })
        
        if (!authentification.ok){
            alert("échec de l'authentification")
            return ;
        }
        //redirection ici peut-être

        console.log("connecté")
        setTriedLogging(true)
        navigate("/user")
        

    } catch (error){
        console.error("Erreur : ", error)
        alert("échec de l'authentification")
    }
    
}
export default Login