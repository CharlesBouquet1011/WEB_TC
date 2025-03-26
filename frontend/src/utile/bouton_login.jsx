import { useNavigate } from "react-router";

function Switch({classe,page,texte}) {
  const navigate=useNavigate()
  switch (classe) {
    case "bouton":
      return (
        <button className="btn btn-primary" onClick={() => change(page, navigate)}>
          {texte}
        </button>
      );

    case "profil":
      return (
        <button className="btn" onClick={() => change(page, navigate)}>
          <img src="/images/profil.jpg" alt="Profil" className="button-image" />
        </button>
      );
    
    case "home":
    return (
        <button className="btn" onClick={() => change(page, navigate)}>
        <img src="/images/home.jpg" alt="Accueil" className="button-home" />
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