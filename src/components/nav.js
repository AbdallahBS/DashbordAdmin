import React from 'react';


export default function Nav() {
  return (
    <nav id="tmSidebar" className="tm-bg-black-transparent tm-sidebar col-lg-3">
    <button className="navbar-toggler" type="button" aria-label="Toggle navigation ">
      <i className="fas fa-bars" />
    </button>
    <div className="tm-sidebar-sticky">
      <div className="tm-brand-box">
        <div className="tm-double-border-1">
          <div className="tm-double-border-2">
            <h1 className="tm-brand text-uppercase">Kub Kloud</h1>
          </div>
        </div>
      </div>
      <ul id="tmMainNav" className="nav flex-column text-uppercase text-right tm-main-nav">
        <li className="nav-item">
          <a href="#intro" className="nav-link active">
            <span className="d-inline-block mr-3">Aceuill</span>
            <span className="d-inline-block tm-white-rect" />
          </a>
        </li>
        <li className="nav-item">
          <a href="#about" className="nav-link">
            <span className="d-inline-block mr-3">Gestion des blog</span>
            <span className="d-inline-block tm-white-rect" />
          </a>
        </li>
        <li className="nav-item">
          <a href="#work" className="nav-link">
            <span className="d-inline-block mr-3">Gestion des services</span>
            <span className="d-inline-block tm-white-rect" />
          </a>
        </li>
        <li className="nav-item">
          <a href="#demandes" className="nav-link">
            <span className="d-inline-block mr-3">Gestion des demandes</span>
            <span className="d-inline-block tm-white-rect" />
          </a>
        </li>
        <li className="nav-item">
          <a href="#clients" className="nav-link">
            <span className="d-inline-block mr-3">assistance clients</span>
            <span className="d-inline-block tm-white-rect" />
          </a>
        </li>
      </ul>
     
      <footer className="text-center text-white small">
        <br></br><br></br>
        <p className="mb--0 mb-2">Kube Kloud 2023/2024</p>
        <p className="mb-0">Espace admin
        </p>
      </footer>
    </div>
  </nav>
  );
}
