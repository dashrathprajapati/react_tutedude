import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          Food-Fusion
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cart"
                className="nav-link d-flex align-items-center"
              >
                <FaShoppingCart className="me-1" /> Cart ({cartItems.length})
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
