export function LocationRow({ voiture, userId, startTime, endTime, setEditLoc, handleDelete }) {
    return (
        <tr>
            <td>{voiture}</td>
            <td>{userId}</td>
            <td>{new Date(startTime).toLocaleDateString()}</td>
            <td>{new Date(endTime).toLocaleDateString()}</td>
            <td>
                <button className="btn btn-secondary btn-sm mx-1" onClick={() => {setEditLoc({voiture, startTime, endTime, userId})}}>Modifier</button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(voiture)}>Supprimer</button>
            </td>
        </tr>
    );
}