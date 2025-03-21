import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useCSRF } from "../Contexts/CsrfContext";
import SeeBookings from "../Locations/seeBookings";
import Logout from "../security/logout";
import Logged from "../Contexts/Authenticated";

export default function User(){
    const {csrfToken}= useCSRF();


    

    
    return(//il faudra rajouter des composants ici
        <Logged>
            <div>
                <h1> Vous êtes connectés</h1>
                <SeeBookings />
                <Logout />
            </div>
        </Logged>
        
    )
}