
//c'est quasi que de l'HTML là
require('dotenv').config();


export default function Assistance(){
    var mail= process.env.mail
    var phoneNumber=process.env.phoneNumber

    return(
        <div className="Assistance">
            Si vous avez un problème, contactez-nous: <br />
            {mail} <br />
            {phoneNumber}
        </div>
    )
}
