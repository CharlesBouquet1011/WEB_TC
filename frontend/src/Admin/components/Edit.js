export function Edit({ setEditTab }) {
  return (
    <div>
      <button type="button" className="btn-close" aria-label="Close" onClick={() => setEditTab(false)}></button>
    </div>
  )
}