//c'est quasi que de l'HTML là
import {useState,useEffect} from "react"
import { useCSRF } from "../Contexts/CsrfContext"
export default function Assistance(){
    const [mail,setMail]=useState("")
    const {csrfToken}=useCSRF()
    const[phoneNumber,setPhoneNumber]=useState("")
    retrieveData(csrfToken,setMail,setPhoneNumber)

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

function retrieveData(csrfToken,setMail,setPhoneNumber){
    const req = async()=>{
        var request=await fetch("http://localhost:3000/api/bookings/infos", {
            method:"GET",
            headers:{
                "Content-type":"application/json",
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include'
    
        })
        request = await request.json()
        const {mail,phoneNumber}=request
        setMail(mail)
        setPhoneNumber(phoneNumber)

        
    }
    req()
}
