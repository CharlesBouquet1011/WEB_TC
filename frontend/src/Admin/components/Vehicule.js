import { useState, useEffect } from 'react';
import { Tile } from './Tile.js';

// import ferrariImage from "../public/ferrari.png"; 

const carList = [
  {
    "marque": "Bugatti",
    "modele": "Chiron",
    "plaque": "FW-245-MD",
    "imageURL": "https://www.usinenouvelle.com/mediatheque/2/3/9/001298932_1200x800_c.jpg",
    "prix": 489,
    "carburant": "Diesel",
    "transmission": "Manuelle",
    "description": "Excellente"
  },
  {
    "marque": "Lamborghini",
    "modele": "Aventador SVJ",
    "plaque": "QR-982-ZX",
    "imageURL": "https://www.automotivpress.fr/wp-content/uploads/2019/03/Lamborghini-Aventador-SVJ-Roadster-8.jpg",
    "prix": 959,
    "carburant": "Essence",
    "transmission": "Automatique",
    "description": "Ouverture papillon"
  },
  {
    "marque": "Rolls-Royce",
    "modele": "Phantom",
    "plaque": "XT-527-KH",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IrIRnm_G2Fj-KNpDNNe70-9JPlivwQbHSA&s",
    "prix": 10.569,
    "carburant": "Diesel",
    "transmission": "Manuelle",
    "description": "Confortable"
  },
  {
    "marque": "Porsche",
    "modele": "911",
    "plaque": "YL-318-WG",
    "imageURL": "https://i.gaw.to/content/photos/41/69/416992-la-nouvelle-porsche-911-turbo-s-grimpe-a-641-chevaux.jpg",
    "prix": 259,
    "carburant": "Électrique",
    "transmission": "Automatique",
    "description": "Sport"
  },
  {
    "marque": "Aston Martin",
    "modele": "DBS Superleggera",
    "plaque": "MK-654-VT",
    "imageURL": "https://i1.wp.com/pdlv.fr/wp-content/uploads/2021/11/70292-autoart-aston-martin-dbs-2.jpg?fit=1200%2C723",
    "prix": 469,
    "carburant": "Essence",
    "transmission": "Manuelle",
    "description": "Élégante"
  },
  {
    "marque": "Bentley",
    "modele": "Continental GT",
    "plaque": "DN-432-XC",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScOsqXe7iLU7dHDVqHPEPb7PAfX-dad0QJFA&s",
    "prix": 789,
    "carburant": "Essence",
    "transmission": "Manuelle",
    "description": "Standing"
  },
  {
    "marque": "Maserati",
    "modele": "MC20",
    "plaque": "ZH-871-BQ",
    "imageURL": "https://cdn.motor1.com/images/mgl/pEblJ/s3/maserati-mc20.jpg",
    "prix": 359,
    "carburant": "Électrique",
    "transmission": "Automatique",
    "description": "Bonne accélération"
  },
  {
    "marque": "McLaren",
    "modele": "765LT",
    "plaque": "GT-609-FY",
    "imageURL": "https://mclaren.scene7.com/is/image/mclaren/765lt-3-1200x1200-1:crop-4x3?wid=1920&hei=1440",
    "prix": 569,
    "carburant": "Électrique",
    "transmission": "Automatique",
    "description": "Dynamique"
  },
  {
    "marque": "Mercedes-AMG",
    "modele": " GT Black Series",
    "plaque": "PJ-728-RM",
    "imageURL": "https://carfans.fr/wp-content/uploads/2023/09/Mercedes-AMG-GT-black-series-occasion_1-scaled.jpg.webp",
    "prix": 189,
    "carburant": "Essence",
    "transmission": "Automatique",
    "description": "Coffre électrique"
  },
  {
    "marque": "Audi",
    "modele": " R8 V10 Performance",
    "plaque": "LX-875-DP",
    "imageURL": "https://lesvoitures.fr/wp-content/uploads/2018/07/audi-r8-v10-plus-audi-sport-performance-2018.jpg",
    "prix": 349,
    "carburant": "Essence",
    "transmission": "Automatique",
    "description": "Pratique"
  },
  {
    "marque": "BMW",
    "modele": "M8 Competition",
    "plaque": "KY-562-TB",
    "imageURL": "https://auto.cdn-rivamedia.com/photos/annoncecli/big/bmw-m8-competition-coupe-157953642.jpg",
    "prix": 379,
    "carburant": "Essence",
    "transmission": "Manuelle",
    "description": "Sport"
  },
  {
    "marque": "Jaguar",
    "modele": "F-Type R",
    "plaque": "OS-903-LN",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLR_fpXtvlGl8FKdzpbIPeXuue0DIUZsoGHA&s",
    "prix": 329,
    "carburant": "Essence",
    "transmission": "Manuelle",
    "description": "Classe"
  },
  {
    "marque": "Lexus",
    "modele": "LC 500",
    "plaque": "EV-146-QZ",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqKsjrD7AVwpiCotPiIxBEOtAa-jbDIeChEw&s",
    "prix": 299,
    "carburant": "Électrique",
    "transmission": "Automatique",
    "description": "Légère"
  },
];

export function Vehicule({ setEditTab }) {
  const [cars, setCars] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost/api/cars");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des véhicules");
        }
        const data = await response.json();
        setCars(data);
        setRefresh(false);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
    fetchCars();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost/api/cars/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du véhicule.");
        }
        setRefresh(true);
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  }

  const handleAddCar = async () => {
    try {
      const randomCar =  carList[Math.floor(Math.random()*carList.length)];
      const response = await fetch(`http://localhost/api/cars/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(randomCar),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du véhicule.");
      }
      setRefresh(true);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

// setEditTab(true)
  return (
    <div className="container mt-4">
      <div className="row g-4">
        <button type="button" className="btn btn-secondary btn-lg" onClick={() => handleAddCar()}>Ajouter un véhicule +</button>
        {cars.voitures?.map((car, index) => (
          <Tile key={index} id={car._id} image={car.imageURL} name={car.marque+" "+car.modele} plate={car.plaque} handleDelete={handleDelete} setEditTab={setEditTab}/>
        )) || "Chargement..."}
      </div>
    </div>
  );
}