import { useNavigate } from "react-router";
import { useVar } from "../Contexts/VariablesGlobales";
function Switch({classe,page,texte}) {
  const {ProtocoleEtDomaine}=useVar()
  const navigate=useNavigate()
  switch (classe) {
    case "bouton":
      return (
        <button className="btn btn-primary ombre" onClick={() => change(page, navigate)}>
          {texte}
        </button>
      );

    case "profil":
      return (
        <button className="btn btn-image ombre" onClick={() => change(page, navigate)}>
          <img src={ProtocoleEtDomaine+"media/image/profil.jpg"} alt="Profil" className="button-image" />
        </button>
      );
    
    case "home":
    return (
        <button className="btn btn-home ombre" onClick={() => change(page, navigate)}>
        <img src={ProtocoleEtDomaine+"media/image/home.jpg"} alt="Accueil" className="button-home" />
        </button>
    ); 
    default:
      return <p className="text-muted">Classe inconnue</p>;
  }
}


async function change(page,navigate){
    navigate(page)   
}
export default Switch