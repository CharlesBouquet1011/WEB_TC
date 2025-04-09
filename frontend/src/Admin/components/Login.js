import { useState } from 'react';

export function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // empêche le rechargement de la page
    const success = onLogin(password);  // met à jour le login avec le mot de passe
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Authentification</h1>
      <form className="text-center mt-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="form-control mt-3"
            id="password"
            placeholder="Mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false); // reset l’erreur si on retape
            }}
            required
          />
          {error && (
            <div className="text-danger mt-2">Mot de passe incorrect</div>
          )}
          <button type="submit" className=" form-control btn btn-primary mt-3">Se connecter</button>
        </div>
      </form>
    </div>
  );
}