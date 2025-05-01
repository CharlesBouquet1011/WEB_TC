//c'est quasi que de l'HTML là
import {useState,useEffect} from "react"
import { useCSRF } from "../Contexts/CsrfContext"
import Fond from "../utile/style.jsx";
import {useAuth} from "../Contexts/Authenticated.js";
import { useNavigate } from "react-router-dom";


export default function Assistance(){
    const { logged } = useAuth(); // récupère l'état de la connexion
    const navigate = useNavigate();
    const { csrfToken } = useCSRF();
    const [isOpen, setIsOpen] = useState(false); // Pour contrôler l'ouverture du pop-up
    const closePopup = () => setIsOpen(false);
    const [formData, setFormData] = useState({
        sujet: '',
        description: '',
        email: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const endpoint = formData.email
                ?  + "/api/assistance/submit-assistance/public"
                :  "/api/assistance/submit-assistance/connecte";
            const response = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
              },
              credentials: "include",
              body: JSON.stringify(formData)
            });
        
            if (!response.ok) {
              throw new Error("Erreur lors de l'envoi du formulaire.");
            }
            setIsOpen(true);
            setFormData({
              sujet: '',
              description: '',
              email: '',
            });
        
          } catch (err) {
            console.error("Erreur réseau :", err);
            alert("Une erreur est survenue lors de l'envoi de votre demande.");
        }
        };
    
      return (
        <Fond>
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Formulaire d'Assistance</h2>
    
          <form onSubmit={handleSubmit}>
            {/* Sujet */}
            <div className="mb-4">
              <label htmlFor="sujet" className="block text-lg font-semibold mb-2">
                Sujet
              </label>
              <input
                type="text"
                id="sujet"
                name="sujet"
                value={formData.sujet}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Entrez le sujet de votre demande"
              />
            </div>
    
            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-lg font-semibold mb-2">
                Description de la demande
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Décrivez votre problème ou demande"
              />
            </div>
            {!logged && (
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold mb-2">
                  Votre email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={!logged} // rendre le champ obligatoire seulement si non connecté
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                  placeholder="Entrez votre email"
                />
              </div>
            )}
            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
              >
                Envoyer la demande
              </button>
            </div>
          </form>
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-xl font-semibold text-center">C'est bon!</h2>
              <p className="mt-4 text-center text-gray-700">
                Votre demande a bien été transmise
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/");
                    }}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
            </div>
            )}
        </div>
        </Fond>
      );
}
    
    
function Assi(){    
    const [mail,setMail]=useState("")
    const {csrfToken}=useCSRF()
    const[phoneNumber,setPhoneNumber]=useState("")
    retrieveAssistanceData(csrfToken,setMail,setPhoneNumber)

    return(<Affichage mail={mail} phoneNumber={phoneNumber} />)
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

export function retrieveAssistanceData(csrfToken,setMail,setPhoneNumber){
    try {
    const req = async()=>{
        var request=await fetch("/api/bookings/infos", {
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
