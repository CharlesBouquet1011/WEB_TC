import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/Authenticated";
import Fond from '../utile/style.jsx';
import { useVar } from "../Contexts/VariablesGlobales.js";


function Login() {
  //récupérer les jetons csrf etc
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
  const {ProtocoleEtDomaine,erreurLogin,setErreurLogin}=useVar()
  const navigate=useNavigate()
 const {triedLogging,setTriedLogging}=useAuth()
  const handleEnterKey = (event,csrfToken,navigate,triedLogging,setTriedLogging,setErreurLogin) =>{
    
    if (event.key==="Enter"){
      submitr(csrfToken,navigate,triedLogging,setTriedLogging,ProtocoleEtDomaine,setErreurLogin)
    }
  }
  useEffect(() => {
    if (!isLoaded) { //si on n'a pas le jeton csrf, on le reprend (c'est du bidouillage, on devrait toujours l'avoir)
      fetchCSRFToken();
    }
  }, [isLoaded, fetchCSRFToken]);
  
  //mettre un peu de pour ce forms, c'est moche pour l'instant: utiliser la classe du div
  return (
    <Fond>
  <div className="container-fluid vh-100">
    <div className="row h-100">
      {/* Login Form Section */}
      <div className="col-md-6 d-flex align-items-center justify-content-center">
        <div className="w-75">
        {erreurLogin && (
  <div className="alert alert-danger mb-4" role="alert">
    {erreurLogin}
  </div>
)}
          <h2 className="mb-4">Connexion à votre compte</h2>
          <p className="text-muted mb-4">Accédez à votre espace personnel</p>

          {/* Error Message (if needed) */}
          {triedLogging && (
            <div className="alert alert-danger mb-4" role="alert">
              Identifiants incorrects. Veuillez réessayer.
            </div>
          )}

          <form>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">Mail</label>
              <input 
                type="text" 
                className="form-control" 
                id="login-email" 
                name="login-email"
                onKeyDown={(event) => handleEnterKey(
                  event, 
                  csrfToken, 
                  navigate, 
                  triedLogging, 
                  setTriedLogging,
                  setErreurLogin
                )}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="login-password" className="form-label">Mot de passe</label>
              <input 
                type="password" 
                className="form-control" 
                id="login-password" 
                name="login-password"
                onKeyDown={(event) => handleEnterKey(
                  event, 
                  csrfToken, 
                  navigate, 
                  triedLogging, 
                  setTriedLogging,
                  setErreurLogin
                )}
              />
            </div>

            <div className="mb-3">
              <a href="#" className="text-muted text-decoration-none">
                Mot de passe oublié ?
              </a>
            </div>

            <button 
              type="button" 
              className="btn btn-dark w-100 mt-3"
              onClick={() => {
                
                submitr(
                csrfToken, 
                navigate, 
                triedLogging, 
                setTriedLogging,
                ProtocoleEtDomaine,
                setErreurLogin
              )}}
            >
              Se connecter
            </button>

            <div className="text-center mt-3">
              <p className="text-muted">
                Vous n'avez pas de compte ? 
                <a 
                  href="/register" 
                  className="ms-2 text-blue-500 text-decoration-none"
                >
                  Inscrivez-vous ici
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="col-md-6 p-0 d-none d-md-block position-relative">
        <img 
          src="/media/image/vroom.jpg" 
          alt="Login background" 
          className="img-fluid w-100 h-100 rounded shadow-lg position-absolute"
          style={{objectFit: 'cover', opacity: 0.7}}
        />
      </div>
    </div>
  </div>
</Fond>

  );
}


async function submitr(csrfToken,navigate,triedLogging,setTriedLogging,ProtocoleEtDomaine,setErreurLogin){
    setErreurLogin("")
    var email,password
    email=document.getElementById("login-email").value
    password=document.getElementById("login-password").value
    
    try{
        var authentification=await fetch(ProtocoleEtDomaine+"api/security/login", {
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