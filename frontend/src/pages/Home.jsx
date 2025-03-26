import logo from '../logo.svg';
import Switch from '../utile/bouton_login.jsx';
import {Fond,Menu} from '../utile/style_home.jsx';



export default function Home(){
    return(
        <Fond>
        <div className="App">
        <div className="video-container">
        <video autoPlay loop muted playsInline className="background-video">
         <source src={"/images/video.mp4"} type="video/mp4" />
            Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
        <div className="overlay">
            <h1>Driving Enhanced</h1>
        </div>
        <Menu/>
        </div>
        
        <Switch classe={"profil"} page={"/login"} texte={"connexion"} />
        <Switch classe={"bouton"} page={"/cars"} texte={"nos voitures"} />
      </div>
      </Fond>

    )
}

