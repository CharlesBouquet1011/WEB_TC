import { useNavigate } from "react-router";
import { useVar } from "../Contexts/VariablesGlobales";

function Switch({classe,page,texte}) {
  const {ProtocoleEtDomaine,setRedirectAfterLogin}=useVar()
  const navigate=useNavigate()
  setRedirectAfterLogin("/user")
  switch (classe) {
    case "bouton":
      return (
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => change(page, navigate)}
        >
          {texte}
        </button>
      );

    case "profil":
      return (
        <button 
          className="relative transition-transform"
          onClick={() => change(page, navigate)}
        >
          <img 
            src={ProtocoleEtDomaine + "media/image/profil.png"} 
            alt="Profil" 
            className="w-10 h-10 fixed top-2 right-5"
          />
        </button>
      );

    case "home":
      return (
        <button 
          className="relative transition-transform"
          onClick={() => change(page, navigate)}
        >
          <img 
            src={ProtocoleEtDomaine + "media/image/home.png"} 
            alt="Accueil" 
            className="w-10 h-10 fixed top-2 left-5"
          />
        </button>
      );

    default:
      return <p className="text-gray-500">Classe inconnue</p>;
  }

}


async function change(page,navigate){
    navigate(page)   
}
export default Switch