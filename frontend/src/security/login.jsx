import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";

function Login() {
  //récupérer les jetons csrf etc
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
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
        <label htmlFor="email">Mail</label> <br />
        <input type="text" id="email" name="email" /> <br />
        
        <label htmlFor="password">Mot de passe</label> <br /> 
        <input type="password" id="password" name="password" /> <br />
        
      </form>
      

      <button id="submit" onClick={() => submit(csrfToken)}> se connecter </button>
    </div>
  );
}


async function submit(csrfToken){
    var email,password
    email=document.getElementById("email").value
    password=document.getElementById("password").value
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

    } catch (error){
        console.error("Erreur : ", error)
        alert("échec de l'authentification")
    }
    
}