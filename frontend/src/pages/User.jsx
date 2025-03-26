import { useCSRF } from "../Contexts/CsrfContext";
import {SeeUserBookings} from "../Locations/seeBookings";
import Logout from "../security/logout";
import Logged from "../Contexts/Authenticated";
import DeleteAccount from "../security/deleteAccount";
import Fond from "../utile/style";

export default function User(){
    const {csrfToken}= useCSRF();

    return(//il faudra rajouter des composants ici
        <Logged>
            <Fond>
                <div>
                    <h1> Vous êtes connectés</h1>
                    <SeeUserBookings />
                    <Logout />
                    <DeleteAccount />
                </div>
            </Fond>
            
        </Logged>
        
    )
}