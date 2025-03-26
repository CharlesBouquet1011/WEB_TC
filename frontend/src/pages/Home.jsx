import logo from '../logo.svg';
import Switch from '../utile/bouton_login.jsx';
import Fond from '../utile/style.jsx';


export default function Home(){
    return(
        <Fond>
        <div className="App">
        <header className="App-header">
          <p> 
            Driving Enhanced    
          </p>
        </header>

        
        <Switch classe={"profil"} page={"/login"} texte={"connexion"} />
        <Switch classe={"bouton"} page={"/cars"} texte={"nos voitures"} />
      </div>
      </Fond>

    )
}

