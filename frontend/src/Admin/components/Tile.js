export function Tile({ id, car, setEditTab, handleDelete}) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
      <div style={{ backgroundColor: "#d4e6f1", maxWidth: "300px", minHeight: "300px", minWidth: "230px"}} className="card p-3 shadow-lg rounded-4">
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <img src={car.imageURL} alt={car.marque+" "+car.modele} className="img-fluid rounded" style={{ maxHeight: "200px", maxWidth: "200px" }} />
        </div>
        <div style={{ maxWidth: "200px" }} className="mt-3">
          <h6 className="fw-bold">{car.marque+" "+car.modele}</h6>
          <p className="text-muted">{car.plaque}</p>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-2">
          <button className="btn btn-secondary px-3" onClick={() => setEditTab(id)}>Modifier</button>
          <button className="btn btn-secondary px-3" onClick={() => handleDelete(id)}>Supprimer</button>
        </div>
      </div>
    </div>
  )
}