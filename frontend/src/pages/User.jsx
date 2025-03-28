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
                    <div className="container mx-auto p-6 space-y-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Vous êtes connectés</h1>
                        <div className="flex flex-col items-center space-y-4">
                        <SeeUserBookings />
                        <Logout />
                        <DeleteAccount />
                        </div>
                    </div>
                </Fond>
            
        </Logged>
        
    )
}