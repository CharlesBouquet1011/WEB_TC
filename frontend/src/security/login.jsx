import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import { useNavigate } from "react-router";

function Login() {
  //récupérer les jetons csrf etc
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
  const navigate=useNavigate()
  useEffect(() => {
    if (!isLoaded) { //si on n'a pas le jeton csrf, on le reprend (c'est du bidouillage, on devrait toujours l'avoir)
      fetchCSRFToken();
    }
  }, [isLoaded, fetchCSRFToken]);
  useEffect(()=>{ //on récupère les bookings
    const isLogged= async () =>{
        try {
            const response = await fetch("http://localhost:3000/api/security/logged", {
                method: "GET",
                headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                  "Content-Type": "application/json",
                  'X-CSRF-Token': csrfToken,
                },
                credentials: 'include',
                
              });
            if (response.ok){
                navigate("/user")
                
                return null;
            }
            

            

        } catch (err){
            console.error("Erreur lors de la vérification du login :",err)


        }
    }
    isLogged();},
    [] 
)
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
      

      <button id="submit" onClick={() => submitr(csrfToken,navigate)}> se connecter </button>
    </div>
  );
}


async function submitr(csrfToken,navigate){
    
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
        navigate("/user")

    } catch (error){
        console.error("Erreur : ", error)
        alert("échec de l'authentification")
    }
    
}
export default Login