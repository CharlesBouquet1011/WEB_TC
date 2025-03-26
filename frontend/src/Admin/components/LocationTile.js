export function LocationTile({ plate, model, startTime, endTime, userId, setEditTab }) {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <div style={{ backgroundColor: "#d4e6f1", maxWidth: "300px", minHeight: "300px", minWidth: "230px"}} className="card p-3 shadow-lg rounded-4">
                <div className="mt-3">
                    <h6 className="fw-bold">{model}</h6>
                    <p className="text-muted">Plaque: {plate}</p>
                    <p className="text-muted">Utilisateur: {userId}</p>
                    <p className="text-muted">Début: {new Date(startTime).toLocaleDateString()}</p>
                    <p className="text-muted">Fin: {new Date(endTime).toLocaleDateString()}</p>
                </div>
                <div className="d-flex justify-content-center gap-2 mt-2">
                    <button className="btn btn-secondary px-3" onClick={() => setEditTab(true)}>Modifier</button>
                    <button className="btn btn-secondary px-3">Supprimer</button>
                </div>
            </div>
        </div>
    );
}