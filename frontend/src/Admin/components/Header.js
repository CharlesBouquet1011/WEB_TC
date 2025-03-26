import { useState } from 'react';

export function Header({ activeTab, setActiveTab }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav style={{ backgroundColor: "#7fb3d5" }} className="navbar navbar-expand-lg nav-underline">
      <div className="container-fluid">
        <a className="navbar-brand">Driving Enhanced</a>
        <button
            className="navbar-toggler"
            type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenMenu(!openMenu)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${openMenu ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className={`nav-link ${activeTab===0 ? "fw-bold" : ""}`} onClick={() => setActiveTab(0)}>Véhicules</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab===1 ? "fw-bold" : ""}`} onClick={() => setActiveTab(1)}>Location</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab===2 ? "fw-bold" : ""}`} onClick={() => setActiveTab(2)}>Client</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab===3 ? "fw-bold" : ""}`} onClick={() => setActiveTab(3)}>Déconnexion</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
