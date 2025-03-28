
//c'est quasi que de l'HTML là
import {useState,useEffect} from "react"
import { useCSRF } from "../Contexts/CsrfContext"
import { useVar } from "../Contexts/VariablesGlobales"
export default function Assistance(){
    const [mail,setMail]=useState("")
    const {csrfToken}=useCSRF()
    const[phoneNumber,setPhoneNumber]=useState("")
    const {ProtocoleEtDomaine}=useVar()
    retrieveData(csrfToken,setMail,setPhoneNumber,ProtocoleEtDomaine)

    return(<Affichage mail={mail} phoneNumber={phoneNumber} />
        
    )
}

function Affichage({mail,phoneNumber}){
    return(<div className="Assistance">
            Si vous avez un problème, contactez-nous: <br />
            {mail} <br />
            {phoneNumber}
        </div>)
    
}

function retrieveData(csrfToken,setMail,setPhoneNumber,domaine){
    try {
        console.log("RetrieveData: ", domaine)
    const req = async()=>{
        var request=await fetch(domaine + "api/bookings/infos", {
            method:"GET",
            headers:{
                "Content-type":"application/json",
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include'
    
        })
        request = await request.json()
        const {mail,phoneNumber}=request
        console.log(mail,phoneNumber)
        setMail(mail)
        setPhoneNumber(phoneNumber)
        req()
        
    }
    } catch (err){
        console.error("Erreur lors de l'execution de retrieve Data :", err)
    }
    
    
    
}
