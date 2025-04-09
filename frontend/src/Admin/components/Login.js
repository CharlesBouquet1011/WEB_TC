import { useState, useEffect } from 'react';

export function Login({ activeTab, setActiveTab }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Authentification</h1>
      <form className="text-center mt-2">
        <div className="form-group">
          <input type="password" className="form-control mt-3" id="password" placeholder="Mot de passe" required />
          <button type="submit" className=" form-control btn btn-primary mt-3">Se connecter</button>
        </div>
      </form>
    </div>
  );
}