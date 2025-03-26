export function LocationRow({ plate, model, startTime, endTime, userId, setEditTab }) {
    return (
        <tr>
            <td>{plate}</td>
            <td>{model}</td>
            <td>{userId}</td>
            <td>{new Date(startTime).toLocaleDateString()}</td>
            <td>{new Date(endTime).toLocaleDateString()}</td>
            <td>
                <button className="btn btn-secondary btn-sm mx-1" onClick={() => setEditTab(true)}>Modifier</button>
                <button className="btn btn-danger btn-sm mx-1">Supprimer</button>
            </td>
        </tr>
    );
}