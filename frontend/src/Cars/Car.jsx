import "./Car.css"

export default function Car({car}){
    
    const {marque, modele, prix, ImageUrl, carburant, transmission, description } = car
    return(
    <div className="Carte_Voiture">
        <img src={ImageUrl} />
        <div className="Carte_voiture_contenu">
            <h1 className="Titre_Carte_voiture">{modele + marque}</h1>
            <p className="Carte_voiture_description">carburant :{carburant}, transmission : {transmission} </p>
            <p className="Prix_Carte_Voiture">Prix: {prix}€</p>
        </div>


    </div>

    )


}