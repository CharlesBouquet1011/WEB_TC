export function Edit({ marque, setEditTab }) {
  return (
    <div>
      <button type="button" className="btn-close" aria-label="Close" onClick={() => setEditTab(false)}></button>
      <p>{marque.marque}</p>
    </div>
  )
}