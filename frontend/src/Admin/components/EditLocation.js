import { useState, useEffect } from "react";

export function EditLocation({ setEditLoc, selectedLocation, locations, setLocations }) {
  const [selectedPlate, setSelectedPlate] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [userId, setUserId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const cars = [
    { plate: "FW-245-MD", model: "Bugatti Chiron" },
    { plate: "QR-982-ZX", model: "Lamborghini Aventador SVJ" },
    { plate: "YL-318-WG", model: "Porsche 911 Turbo S" },
    { plate: "PJ-728-RM", model: "Mercedes-AMG GT Black Series" }
  ];

  // Load the current location data into the form fields when the component mounts
  useEffect(() => {
    if (selectedLocation) {
      setSelectedPlate(selectedLocation.plate);
      setSelectedModel(selectedLocation.model);
      setUserId(selectedLocation.userId);
      setStartTime(selectedLocation.startTime);
      setEndTime(selectedLocation.endTime);
    }
  }, [selectedLocation]);

  const handleUpdate = () => {
    setError(""); // Clear any previous error

    if (!selectedPlate || !userId || !startTime || !endTime) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      setError("La date de fin doit être postérieure à la date de début.");
      return;
    }

    const updatedLocations = locations.map((loc) =>
      loc.plate === selectedLocation.plate && loc.userId === selectedLocation.userId
        ? { plate: selectedPlate, model: selectedModel, startTime, endTime, userId }
        : loc
    );

    setLocations(updatedLocations);
    setEditLoc(false); // Close the edit form
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand">Modifier une Location</span>
          <button className="btn btn-outline-danger" onClick={() => setEditLoc(false)}>Retour</button>
        </div>
      </nav>

      {/* Form */}
      <div className="container mt-4">
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Vehicle Selection */}
        <div className="mb-3">
          <label className="form-label">Véhicule</label>
          <select
            className="form-select"
            value={selectedPlate}
            onChange={(e) => {
              const selectedCar = cars.find(car => car.plate === e.target.value);
              setSelectedPlate(selectedCar.plate);
              setSelectedModel(selectedCar.model);
            }}
          >
            {cars.map((car, index) => (
              <option key={index} value={car.plate}>
                {car.model} ({car.plate})
              </option>
            ))}
          </select>
        </div>

        {/* User Name */}
        <div className="mb-3">
          <label className="form-label">Nom de l'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        {/* Start Date */}
        <div className="mb-3">
          <label className="form-label">Date de début</label>
          <input
            type="date"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div className="mb-3">
          <label className="form-label">Date de fin</label>
          <input
            type="date"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* Validate Button */}
        <button className="btn btn-primary" onClick={handleUpdate}>
          Valider
        </button>
      </div>
    </div>
  );
}