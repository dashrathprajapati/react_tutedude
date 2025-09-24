import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
          <span>React Router</span>
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/user" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>User Info</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
