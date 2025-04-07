export function LocationRow({ id, voiture, user, startTime, endTime, setEditLoc, handleDelete }) {
    if (!voiture) {
        return (
            <tr>
            <td>UNDEFINED</td>
            <td>{user.name} ({user.email})</td>
            <td>{new Date(startTime).toLocaleDateString()}</td>
            <td>{new Date(endTime).toLocaleDateString()}</td>
            <td>
                <button className="btn btn-secondary btn-sm mx-1" onClick={() => setEditLoc(id)}>Modifier</button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(id)}>Supprimer</button>
            </td>
        </tr>
        )
    }
    return (
        <tr>
            <td>{voiture.marque} {voiture.modele} ({voiture.plaque})</td>
            <td>{user.name} ({user.email})</td>
            <td>{new Date(startTime).toLocaleDateString()}</td>
            <td>{new Date(endTime).toLocaleDateString()}</td>
            <td>
                <button className="btn btn-secondary btn-sm mx-1" onClick={() => setEditLoc(id)}>Modifier</button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(id)}>Supprimer</button>
            </td>
        </tr>
    );
}