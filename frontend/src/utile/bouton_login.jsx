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
          <img src="/profil.jpg" alt="Profil" className="button-image" />
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