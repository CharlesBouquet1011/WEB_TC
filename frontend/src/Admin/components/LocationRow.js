export function LocationRow({ plate, model, startTime, endTime, userId, setEditLoc, handleDelete }) {
    return (
        <tr>
            <td>{plate}</td>
            <td>{model}</td>
            <td>{userId}</td>
            <td>{new Date(startTime).toLocaleDateString()}</td>
            <td>{new Date(endTime).toLocaleDateString()}</td>
            <td>
                <button className="btn btn-secondary btn-sm mx-1" onClick={() => {setEditLoc({plate, model, startTime, endTime, userId})}}>Modifier</button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(plate)}>Supprimer</button>
            </td>
        </tr>
    );
}