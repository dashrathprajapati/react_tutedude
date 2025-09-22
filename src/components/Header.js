import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner container-flex">
        <div className="logo"> 
          <div className="logo-text">
            <strong>React</strong> Router
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}>
            About
          </NavLink>
          <NavLink to="/user" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}>
            User Info
          </NavLink>
        </nav>
      </div>
    </header>
  );
}