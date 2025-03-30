import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import Fond from '../utile/style.jsx';
import { useNavigate } from "react-router";
import { useVar } from "../Contexts/VariablesGlobales.js";


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
  const {ProtocoleEtDomaine}=useVar()

  const handleEnterKey = (event,csrfToken,setErreurs,champs,navigate,ProtocoleEtDomaine) =>{
    if (event.key==="Enter"){
      event.preventDefault()
      submit(csrfToken, setErreurs, champs, navigate,ProtocoleEtDomaine)
    }
  }

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
      if (! (await mailChecker(mail,csrfToken,ProtocoleEtDomaine)) &&
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
      <div className="container-fluid min-h-screen flex flex-col">
        <div className="row flex-grow">
          {/* Image Section */}
          <div className="col-md-6 p-0 d-none d-md-block position-relative">
            <img 
              src="/image/voit1.jpg" 
              alt="Registration background" 
              className="img-fluid w-80 h-80 position-absolute"
              style={{objectFit: 'cover', opacity: 0.7}}
            />
          </div>

          {/* Registration Form Section */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="w-75">
              <h2 className="mb-4">Créez un compte</h2>
              <p className="text-muted mb-4">Rejoignez notre communauté dès maintenant</p>

              {/* Large Error Message */}
              {erreurs.grosseErreur && (
                <div className="alert alert-danger mb-4" role="alert">
                  {erreurs.grosseErreur}
                </div>
              )}

              <form>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">Nom de famille</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="Name"
                    onChange={(event) => handleChange(event, setName)} 
                    onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [name, fname, mail, phoneNumber, Password, Cpassword], navigate,ProtocoleEtDomaine)}
                  />
                  {erreurs.name && <small className="text-danger">{erreurs.name}</small>}
                </div>

                <div className="mb-3">
                  <label htmlFor="FirstName" className="form-label">Prénom</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="FirstName"
                    onChange={(event) => handleChange(event, setFName)} 
                    onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [name, fname, mail, phoneNumber, Password, Cpassword], navigate,ProtocoleEtDomaine)}

                  />
                  {erreurs.fname && <small className="text-danger">{erreurs.fname}</small>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Mail</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    onChange={(event) => handleChange(event, setMail)} 
                    onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [name, fname, mail, phoneNumber, Password, Cpassword], navigate,ProtocoleEtDomaine)}

                  />
                  {erreurs.mail && <small className="text-danger">{erreurs.mail}</small>}
                </div>

                <div className="mb-3">
                  <label htmlFor="Phone" className="form-label">Numéro de téléphone</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="Phone"
                    onChange={(event) => handleChange(event, setPhoneNumber)}
                    onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [name, fname, mail, phoneNumber, Password, Cpassword], navigate,ProtocoleEtDomaine)}

                  />
                  {erreurs.phoneNumber && <small className="text-danger">{erreurs.phoneNumber}</small>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password"
                    onChange={(event) => handleChange(event, setPassword)} 
                    onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [name, fname, mail, phoneNumber, Password, Cpassword], navigate,ProtocoleEtDomaine)}

                  />
                  {erreurs.password1 && <small className="text-danger">{erreurs.password1}</small>}
                </div>

                <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">Confirmer le mot de passe</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="cpassword"
                    onChange={(event) => handleChange(event, setCPassword)}
                    onKeyDown={(event)=>handleEnterKey(event,csrfToken, setErreurs, [name, fname, mail, phoneNumber, Password, Cpassword], navigate,ProtocoleEtDomaine)}

                  />
                  {erreurs.password && <small className="text-danger">{erreurs.password}</small>}
                </div>

                <button 
                  type="button" 
                  className="btn btn-dark w-100 mt-3"
                  onClick={() => submit(csrfToken, setErreurs, [name, fname, mail, phoneNumber, Password, Cpassword], navigate,ProtocoleEtDomaine)}
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
    </Fond>
  );
}

async function submit(csrfToken,setErreurs,champs,navigate,proto){
    try {
              //récupérer les données du forms

      var name, fname, mail, phone, password, cpassword
      [name,fname,mail,phone,password,cpassword]= champs
      if (await checkErreursSubmit(name,fname,mail,phone,password,cpassword,setErreurs)){
        //il y a des erreurs
        return ;
      }
      if (!(await mailChecker(mail,csrfToken,proto))){
        setErreurs(etatPrec=>({
          ...etatPrec,
          grosseErreur:"Votre email est incorrect",}
        ))
        return ;
      
      }
      
        
        

        

        const data={"Name": name, "FirstName": fname , "email": mail, "PhoneNumber":phone,"Password":password }

        const response = await fetch(proto+"api/security/registration", {
          method: "POST",
          headers: { //pour partager le csrf entre les composants, j'ai choisi d'utiliser un contexte (le passer en argument de chaque élément devient vite ingérable)
            "Content-Type": "application/json",
            'X-CSRF-Token': csrfToken,
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        console.log("response ok:" ,response.ok)
        if (response.ok) {
          console.log("on va au /login")
          console.log(navigate)
          // Si la requête réussit, on redirige
          navigate("/login");

        } else {
          const errorData = await response.json();
          setErreurs(prevState => ({
            ...prevState,
            grosseErreur: errorData.message || "Erreur serveur, veuillez réessayer plus tard",
          }));
        }

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
        if ((!name || !fname || !mail || !phone || !password || !cpassword) && !(!name && !fname && !mail && !phone && !password && !cpassword)){ //si tous les champs ne sont pas remplis mais pas si aucun n'est rempli
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

async function mailChecker(mail,csrfToken,proto){
  try{
    var checkmail = fetch(proto+"api/security/mail-check", {
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
export function handleChange(event,fonction){
  fonction(event.target.value)
}

export default Registration;

