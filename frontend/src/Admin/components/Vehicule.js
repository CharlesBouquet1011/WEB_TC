import { useState, useEffect } from 'react';
import { Tile } from './Tile.js';

// import ferrariImage from "../public/ferrari.png"; 
// const cars = [
//   { image: "https://www.usinenouvelle.com/mediatheque/2/3/9/001298932_1200x800_c.jpg", model: "Bugatti Chiron", plate: "FW-245-MD" },
//   //{ image: ferrariImage, model: "Ferrari 812 Superfast", plate: "AB-763-LP" },
//   { image: "https://www.automotivpress.fr/wp-content/uploads/2019/03/Lamborghini-Aventador-SVJ-Roadster-8.jpg", model: "Lamborghini Aventador SVJ", plate: "QR-982-ZX" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IrIRnm_G2Fj-KNpDNNe70-9JPlivwQbHSA&s", model: "Rolls-Royce Phantom", plate: "XT-527-KH" },
//   { image: "https://i.gaw.to/content/photos/41/69/416992-la-nouvelle-porsche-911-turbo-s-grimpe-a-641-chevaux.jpg", model: "Porsche 911 Turbo S", plate: "YL-318-WG" },
//   { image: "https://i1.wp.com/pdlv.fr/wp-content/uploads/2021/11/70292-autoart-aston-martin-dbs-2.jpg?fit=1200%2C723", model: "Aston Martin DBS Superleggera", plate: "MK-654-VT" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScOsqXe7iLU7dHDVqHPEPb7PAfX-dad0QJFA&s", model: "Bentley Continental GT", plate: "DN-432-XC" },
//   { image: "https://cdn.motor1.com/images/mgl/pEblJ/s3/maserati-mc20.jpg", model: "Maserati MC20", plate: "ZH-871-BQ" },
//   { image: "https://mclaren.scene7.com/is/image/mclaren/765lt-3-1200x1200-1:crop-4x3?wid=1920&hei=1440", model: "McLaren 765LT", plate: "GT-609-FY" },
//   { image: "https://carfans.fr/wp-content/uploads/2023/09/Mercedes-AMG-GT-black-series-occasion_1-scaled.jpg.webp", model: "Mercedes-AMG GT Black Series", plate: "PJ-728-RM" },
//   { image: "https://lesvoitures.fr/wp-content/uploads/2018/07/audi-r8-v10-plus-audi-sport-performance-2018.jpg", model: "Audi R8 V10 Performance", plate: "LX-875-DP" },
//   { image: "https://auto.cdn-rivamedia.com/photos/annoncecli/big/bmw-m8-competition-coupe-157953642.jpg", model: "BMW M8 Competition", plate: "KY-562-TB" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLR_fpXtvlGl8FKdzpbIPeXuue0DIUZsoGHA&s", model: "Jaguar F-Type R", plate: "OS-903-LN" },
//   { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqKsjrD7AVwpiCotPiIxBEOtAa-jbDIeChEw&s", model: "Lexus LC 500", plate: "EV-146-QZ" }
// ];

const newCar = {
  "marque": "Marque",
  "plaque": "TC-404-IF",
  "imageURL": "https://www.usinenouvelle.com/mediatheque/2/3/9/001298932_1200x800_c.jpg"
}

export function Vehicule({ setEditTab }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost/api/cars");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des véhicules");
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };
  
    fetchCars();
  }, [cars.voitures]);

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
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  }

  const handleAddCar = async () => {
    try {
      const response = await fetch(`http://localhost/api/cars/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du véhicule.");
      }
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
          <Tile key={index} id={car._id} image={car.imageURL} model={car.marque} plate={car.plaque} handleDelete={handleDelete} setEditTab={setEditTab}/>
        )) || "Chargement..."}
      </div>
    </div>
  );
}