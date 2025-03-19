import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
function Registration() {
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
        try{
            var checkmail = fetch("http://localhost:3000/api/security/mail-check", {
              method: "POST",
              headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
                "Content-Type": "application/json",
                'X-CSRF-Token': csrfToken,
              },
              credentials: 'include',
              body: JSON.stringify({"email": mail}),
            });
            
        } catch (err){
            console.error("erreur",err)
        }   
        //vérifications
        if (!name || !fname || !mail || !phone || !password || !cpassword){
            alert("Veuillez remplir tous les champs")
            return;
        }
        if (cpassword != password){
            alert("Votre mot de passe ne correspond pas à la confirmation du mot de passe")
            return ;
        }
        if (password.length <10){
          alert("Votre mot de passe doit contenir au moins 10 caractères");
          return ;
        }
        if (!verifMotDePasse(password)){
          alert("Veuillez mettre des symboles spéciaux (#,_,$,..) et des chiffres dans votre mot de passe")
          return ;
        }

        if (!(mail.includes("@")) || !(mail.includes("."))){
          alert("Votre email est incorrect")
          return ;
        }

        if (phone.length != 10 || phone[0]!="0"){
          alert("numéro de téléphone incorrect")
          return ;
        }
        checkmail = await checkmail
        checkmail= await checkmail.json();
        
        if (checkmail.dispo != "dispo"){
          alert("Votre email est incorrect")
          return ;
        }


        const data={"Name": name, "FirstName": fname , "email": mail, "PhoneNumber":phone,"Password":password }

        const response = await fetch("http://localhost:3000/api/security/registration", {
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
//renvoie True si le mot de passe est suffisamment sécurisé, false sinon
function verifMotDePasse(motdePasse){
  const nombres=["0","1","2","3","4","5","6","7","8","9"]
  const symboles_speciaux=["#","_","|","@","€","$","?",".",";",",","/","!","%","$","*","+","-","£"]
  var retour1=false
  var retour2=false
  for (let i=0;i<nombres.length;i++){
    retour1=retour1 || motdePasse.includes(nombres[i])
    
  }
  for (let i=0;i<nombres.length;i++){
    retour2=retour2 || motdePasse.includes(symboles_speciaux[i])
    
  }
  return retour1 & retour2
}

export default Registration;

