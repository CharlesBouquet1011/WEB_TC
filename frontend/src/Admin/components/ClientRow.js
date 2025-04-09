export function ClientRow({ id, name, number, email, password, admin, setEditClient, handleDelete }) {
    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td>{email}</td>
            <td>
                <button className="btn btn-secondary btn-sm mx-1" onClick={() => setEditClient(id)}>Modifier</button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(id)}>Supprimer</button>
            </td>
        </tr>
    );
}