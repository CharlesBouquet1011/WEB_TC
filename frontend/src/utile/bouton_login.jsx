import { useNavigate } from "react-router";

function Switch({classe,page,texte}) {
  const navigate=useNavigate()
  switch (classe) {
    case "bouton":
      return (
        <button className="btn btn-primary btn-hover" onClick={() => change(page, navigate)}>
          {texte}
        </button>
      );

    case "profil":
      return (
        <button className="btn btn-hover" onClick={() => change(page, navigate)}>
          <img src="/image/profil.png" alt="Profil" className="button-image" />
        </button>
      );
    
    case "home":
    return (
        <button className="btn btn-hover" onClick={() => change(page, navigate)}>
        <img src="/image/home.png" alt="Accueil" className="button-home" />
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