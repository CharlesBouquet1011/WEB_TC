import { useState, useEffect } from 'react';

export function Header({ activeTab, setActiveTab }) {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setOpenMenu(false);
      } else {
        setOpenMenu(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={{ backgroundColor: "#7fb3d5" }} className="navbar navbar-expand-lg nav-underline">
      <div className="container-fluid">
        <a className="navbar-brand">Driving Enhanced</a>
        <button className="navbar-toggler" type="button" onClick={() => setOpenMenu(!openMenu)}>
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${openMenu ? "collapse" : ""}`} id="navbarSupportedContent">
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
