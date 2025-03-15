import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
function Registration() {
  //récupérer les jetons csrf etc
  const {csrfToken, setcrsfToken}= useCSRF();
  //mettre un peu de pour ce forms, c'est moche pour l'instant: utiliser la classe du div
    console.log("jeton csrf elem registration: " + csrfToken )
  return (
    <div className="Registration-form">
      <h2>Créez un compte dès maintenant !</h2>
      <form>
        <label htmlFor="Name">Nom de famille</label> <br />
        <input type="text" id="Name" name="Name" /> <br />
        <label htmlFor="FirstName">Prénom</label> <br />
        <input type="text" id="FirstName" name="FirstName" /> <br />
        <label htmlFor="email">Mail</label> <br />
        <input type="text" id="email" name="email" /> <br />
        <label htmlFor="Phone">Numéro de téléphone</label> <br /> 
        <input type="number" id="Phone" name="Phone" /> <br />
        <label htmlFor="password">Mot de passe</label> <br /> 
        <input type="password" id="password" name="password" /> <br />
        <label htmlFor="cpassword">Confirmer le mot de passe</label> <br />
        <input type="password" id="cpassword" name="cpassword" /> <br />
      </form>
      

      <button id="submit" onClick={() => submit(csrfToken)}> s'inscrire </button>
    </div>
  );
}

async function submit(csrfToken){
    console.log("jeton csrf " + csrfToken)
    try {
        
        

        //récupérer les données du forms
        var name, fname, mail, phone, password, cpassword
        [name,fname,mail,phone,password,cpassword]= [
            document.getElementById("Name").value,
            document.getElementById("FirstName").value,
            document.getElementById("email").value,
            document.getElementById("Phone").value,
            document.getElementById("password").value,
            document.getElementById("cpassword").value

        ]
        //vérifications
        if (!name || !fname || !mail || !phone || !password || !cpassword){
            alert("Veuillez remplir tous les champs")
            return;
        }
        if (cpassword != password){
            alert("Votre mot de passe ne correspond pas à la confirmation du mot de passe"+  password + cpassword)
            return ;
        }
        
        const data={"Name": name, "FirstName": fname , "email": mail, "PhoneNumber":phone,"Password":password }

        const response = await fetch("http://localhost:3000/api/registration", {
          method: "POST",
          headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
            "Content-Type": "application/json",
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        console.log(response)
    } catch (err){
        console.error("erreur",err)
    }   

}


export default Registration;

