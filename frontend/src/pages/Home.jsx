import logo from '../logo.svg';
import Registration from '../security/registration.jsx';
import Login from '../security/login.jsx';
import Switch from '../boutons/bouton_login.jsx';

import Cars from '../Cars/Cars.jsx';
export default function Home(){
    return(
        <div className="App">
        <header className="App-header">
          <p> 
            Driving Enhanced    
          </p>
        </header>

        
        <Switch page={"/login"} texte={"connexion"} />
        <Switch page={"/cars"} texte={"nos voitures"} />
      </div>

    )
}

