//c'est quasi que de l'HTML là
import {useState,useEffect} from "react"
import { useCSRF } from "../Contexts/CsrfContext"
import { useVar } from "../Contexts/VariablesGlobales"
import Fond from "../utile/style.jsx";

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
    return(
        <Fond>
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card text-white bg-dark shadow-lg p-5 border border-warning rounded-3" style={{ maxWidth: "500px" }}>
                <div className="card-body text-center">
                    <h1 className="display-4 fw-bold text-warning">Assistance</h1>
                    <p className="lead">Si vous avez un problème, contactez-nous :</p>
                    <hr className="border-warning" />
                    <p className="fs-5">
                        📧 <a href={`mailto:${mail}`} className="text-warning text-decoration-none">{mail}</a>
                    </p>
                    <p className="fs-5">
                        📞 <a href={`tel:${phoneNumber}`} className="text-warning text-decoration-none">{phoneNumber}</a>
                    </p>
                </div>
            </div>
        </div>
        </Fond>
        )
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
        setMail(mail)
        setPhoneNumber(phoneNumber)
        
        
    }
    req()
    } catch (err){
        console.error("Erreur lors de l'execution de retrieve Data :", err)
    }
    
    
    
}
