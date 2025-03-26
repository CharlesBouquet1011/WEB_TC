export function EditLocation({ setEditLoc }) {
    return (
        <div>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setEditLoc(false)}></button>
        </div>
    );
}