import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import Fond from '../utile/style.jsx';
import { useNavigate } from "react-router";

function Registration() {
  const navigate=useNavigate()

  //récupérer les jetons csrf etc
  const {csrfToken, setcrsfToken ,fetchCSRFToken, isLoaded}= useCSRF();
  const [erreurs,setErreurs]=useState({password:'',mail:'',name:'',fname:'',phoneNumber:'',grosseErreur:"",password1:''})
  const [Password, setPassword]=useState('')
  const [Cpassword, setCPassword]=useState('')
  const [mail,setMail]=useState("")
  const [name,setName]=useState("")
  const [fname, setFName]=useState("")
  const [phoneNumber,setPhoneNumber]=useState("")

  useEffect(() => {
    if (!isLoaded) { //si on n'a pas le jeton csrf, on le reprend (c'est du bidouillage, on devrait toujours l'avoir)
      fetchCSRFToken();
    }
  }, [isLoaded, fetchCSRFToken]);

  useEffect(()=>{
     //utiliser les hooks
    if ( Password && Password.length>0 &&
    Cpassword && Cpassword.length >0 &&
    Password!=Cpassword){
      setErreurs(etatPrec=>({
        ...etatPrec,
        password:"Mot de passe et confirmation du mot de passe différents",}
      ))
    }
    else{
      setErreurs(etatPrec=>({
        ...etatPrec,
        password:"",}
      ))
    }

  },[Cpassword,Password])
  useEffect(()=>{

    const  effect3= async()=>{
      if (! (await mailChecker(mail,csrfToken)) &&
    mail &&
    mail.length>0
  
  ){  
    setErreurs(etatPrec=>({
      ...etatPrec,
      mail:"Mail Incorrect",}
    ))
    }
    else{
      setErreurs(etatPrec=>({
      ...etatPrec,
      mail:"",}
    ))
    }
    }
    effect3()
    
  },[mail])

  useEffect(()=>{
    const erreur=async ()=>{
      checkErreurs(name,fname,mail,phoneNumber,Password,Cpassword,setErreurs)

    }
    erreur()
  },[name,fname,mail,phoneNumber,Password,Cpassword])

  //mettre un peu de pour ce forms, c'est moche pour l'instant: utiliser la classe du div
  return (
    <Fond>
      <div className="Registration-form">
        <h2>Créez un compte dès maintenant !</h2>
        <form>
          <AfficheGrosseErreur message={erreurs.grosseErreur} />
          <label htmlFor="Name">Nom de famille</label> <br />
          <input type="text" id="Name" name="Name" onChange={(event)=>handleChange(event,setName)} /> <br />
          <AfficheErreur message={erreurs.name} />
          <label htmlFor="FirstName">Prénom</label> <br />
          <input type="text" id="FirstName" name="FirstName" onChange={(event)=>handleChange(event,setFName)} /> <br />
          <AfficheErreur message={erreurs.fname} />
          <label htmlFor="email">Mail</label> <br />
          <input type="text" id="email" name="email" onChange={(event)=>handleChange(event,setMail)} /> <br />
          <AfficheErreur message={erreurs.mail} />
          <label htmlFor="Phone">Numéro de téléphone</label> <br /> 
          <input type="text " id="Phone" name="Phone" onChange={(event)=>handleChange(event,setPhoneNumber)}/> <br />
          <AfficheErreur message={erreurs.phoneNumber} />
          <label htmlFor="password">Mot de passe</label> <br /> 
          <input type="password" id="password" name="password" onChange={(event)=>handleChange(event,setPassword)} /> <br />
          <AfficheErreur message={erreurs.password1} />

          <label htmlFor="cpassword">Confirmer le mot de passe</label> <br />

          <input type="password" id="cpassword" name="cpassword" onChange={(event)=>handleChange(event,setCPassword)}/> <br />
          <AfficheErreur message={erreurs.password} />
        </form>
        

        <button id="submit" onClick={() => submit(csrfToken,setErreurs,[name,fname,mail,phoneNumber,Password,Cpassword],navigate)}> s'inscrire </button>
      </div>
    </Fond>
  );
}

async function submit(csrfToken,setErreurs,champs,navigate){
    try {
              //récupérer les données du forms

      var name, fname, mail, phone, password, cpassword
      [name,fname,mail,phone,password,cpassword]= champs
      if (await checkErreursSubmit(name,fname,mail,phone,password,cpassword,setErreurs)){
        //il y a des erreurs
        return ;
      }
      if (!(await mailChecker(mail,csrfToken))){
        setErreurs(etatPrec=>({
          ...etatPrec,
          grosseErreur:"Votre email est incorrect",}
        ))
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
        navigate("/login")

    } catch (err){
        console.error("erreur",err)
        setErreurs(etatPrec=>({
          ...etatPrec,
          grosseErreur:"Erreur serveur, veuillez réessayer plus tard",}
        ))
        
    }   

}

async function checkErreurs(name,fname,mail,phone,password,cpassword,setErreurs){
        var err=false
        if (isNaN(phone) && phone!==''){
          setErreurs(etatPrec=>({
            ...etatPrec,
            phoneNumber:"Veuillez rentrer un nombre",}
          ))
          err=true
        }
        else {
          setErreurs(etatPrec=>({
            ...etatPrec,
            phoneNumber:"",}
          ))
        }
        //vérifications
        if (!name || !fname || !mail || !phone || !password || !cpassword){
          setErreurs(etatPrec=>({
            ...etatPrec,
            grosseErreur:"Veuillez remplir tous les champs",}
          ))
            err=true
        }
        else{
          setErreurs(etatPrec=>({
            ...etatPrec,
            grosseErreur:"",}
          ))
        }
        
        if (password.length <10){
          setErreurs(etatPrec=>({
            ...etatPrec,
            password1:"Votre mot de passe doit contenir au moins 10 caractères",}
          ))
          err=true
        }
        else{
          setErreurs(etatPrec=>({
            ...etatPrec,
            password1:"",}
          ))
        }
        
        
        if ((password.toUpperCase()==password || password.toLowerCase()==password) &&password.length>0) {
          setErreurs(etatPrec=>({
            ...etatPrec,
            password1:"Veuillez inclure des majuscules et des minuscules",}
          ))
          err=true

        }
        else{
          setErreurs(etatPrec=>({
            ...etatPrec,
            password1:"",}
          ))
        }
        if (!verifMotDePasse(password) &&password.length>0){
          setErreurs(etatPrec=>({
            ...etatPrec,
            password1:"Veuillez mettre des symboles spéciaux (#,_,$,..) et des chiffres dans votre mot de passe",}
          ))

          err=true
        }
        else{
          setErreurs(etatPrec=>({
            ...etatPrec,
            password1:"",}
          ))
        }
        
        if (phone.length>1 && (phone.length != 10 || phone[0]!="0" || (phone[1]!="3" && phone[1]!='6' && phone[1]!='7'))){
          setErreurs(etatPrec=>({
            ...etatPrec,
            phoneNumber:"numéro de téléphone incorrect",}
          ))
          err=true
        }
        else{
          setErreurs(etatPrec=>({
            ...etatPrec,
            phoneNumber:"",}
          ))
        }
        
        

}

//check les erreurs au submit et les affiches en gros, pareil que la fonction du dessus globalement
async function checkErreursSubmit(name,fname,mail,phone,password,cpassword,setErreurs){
  var err=false
  //vérifications
  if (!name || !fname || !mail || !phone || !password || !cpassword){
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"Veuillez remplir tous les champs",}
    ))
      return true;
  }
  else{
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"",}
    ))
  }
  if (isNaN(phone) || phone.trim()===''){
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"Veuillez rentrer un nombre",}
    ))
    err=true
  }
  else{
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"",}
    ))
  }
  if (password.length <10){
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"Votre mot de passe doit contenir au moins 10 caractères",}
    ))
    err=true;
  }
  else{
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"",}
    ))
  }
  
  if (password.toUpperCase()==password || password.toLowerCase()==password){
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"Veuillez inclure des majuscules et des minuscules",}
    ))
    err=true

  }
  else{
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"",}
    ))
  }
  if (!verifMotDePasse(password)){
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"Veuillez mettre des symboles spéciaux (#,_,$,..) et des chiffres dans votre mot de passe",}
    ))

    err=true
  }
  if (cpassword != password){
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"Votre mot de passe ne correspond pas à la confirmation du mot de passe",}
    ))
      err=true;
  }
  else{
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"",}
    ))
  }


  if (phone.length != 10 || phone[0]!="0" || (phone[1]!="3" && phone[1]!='6' && phone[1]!='7')){
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"numéro de téléphone incorrect",}
    ))
    err=true
  }
  else{
    setErreurs(etatPrec=>({
      ...etatPrec,
      grosseErreur:"",}
    ))
  }
  return err
  

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
  return retour1 && retour2
}

function AfficheErreur(messagedic){
  const {message}=messagedic
  if (message && message.length>0){
    return(
      <>
      <br />
      <p className="texte">
        {message}
      </p>
      </>
    )
  }
  else {

    return null;
  }
}
function AfficheGrosseErreur(messagedic){
  const {message}=messagedic
  if (message && message.length>0){
    return(
      <>
      <br />
      <div className="texte">
        {message}
      </div>
      </>
    )
  }
  else {

    return null;
  }
}

async function mailChecker(mail,csrfToken){
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
    checkmail = await checkmail
          checkmail= await checkmail.json();
          console.log(checkmail)
    if (checkmail.dispo != "dispo"){
      console.log("pas dispo")
      return false ;}
    else{
      if (!(mail.includes("@")) || !(mail.includes("."))){
        console.log("pas de @ ou de .")
        return false;
            }
      else{
        console.log("tout bon")
        return true
            }
          }
  } catch (err){
      console.error("erreur",err)
  }  
  
          
}
//utiliser que sur les fonction setmachin truc de useState
function handleChange(event,fonction){
  fonction(event.target.value)
}

export default Registration;

