import { useState } from "react";

export function AddLocation({ setAddLocationMode, locations, setLocations }) {
  const [selectedPlate, setSelectedPlate] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [userId, setUserId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const cars = [
    { plate: "FW-245-MD", model: "Bugatti Chiron" },
    { plate: "QR-982-ZX", model: "Lamborghini Aventador SVJ" },
    { plate: "YL-318-WG", model: "Porsche 911 Turbo S" },
    { plate: "PJ-728-RM", model: "Mercedes-AMG GT Black Series" }
  ];

  const handleSubmit = () => {
    if (!selectedPlate || !userId || !startTime || !endTime) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const newLocation = {
      plate: selectedPlate,
      model: selectedModel,
      startTime,
      endTime,
      userId
    };

    setLocations([...locations, newLocation]);
    setAddLocationMode(false); // Go back to the locations page
  };

  return (
    <div>
      {/* Simple Bootstrap Navbar */}
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand">Ajouter une Location</span>
          <button className="btn btn-outline-danger" onClick={() => setAddLocationMode(false)}>Retour</button>
        </div>
      </nav>

      {/* Form for Adding a Location */}
      <div className="container mt-4">
        <div className="mb-3">
          <label className="form-label">Véhicule</label>
          <select className="form-select" onChange={(e) => {
            const selectedCar = cars.find(car => car.plate === e.target.value);
            setSelectedPlate(selectedCar.plate);
            setSelectedModel(selectedCar.model);
          }}>
            <option value="">Sélectionnez un véhicule</option>
            {cars.map((car, index) => (
              <option key={index} value={car.plate}>{car.model} ({car.plate})</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Nom de l'utilisateur</label>
          <input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date de début</label>
          <input type="date" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date de fin</label>
          <input type="date" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>Valider</button>
      </div>
    </div>
  );
}