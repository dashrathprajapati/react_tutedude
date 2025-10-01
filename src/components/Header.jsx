import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

export default function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-3 border-bottom">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center fw-bold fs-3 text-danger"
        >
          <GiKnifeFork className="me-2 text-danger" size={30} />
          Food<span className="text-dark">Fusion</span>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link fw-semibold px-2 ${
                    isActive ? "text-danger border-bottom border-2 border-danger" : "text-dark"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `nav-link fw-semibold px-2 ${
                    isActive ? "text-danger border-bottom border-2 border-danger" : "text-dark"
                  }`
                }
              >
                Menu
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link fw-semibold px-2 ${
                    isActive ? "text-danger border-bottom border-2 border-danger" : "text-dark"
                  }`
                }
              >
                About
              </NavLink>
            </li>

            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <NavLink
                to="/cart"
                className="btn btn-danger d-flex align-items-center position-relative px-3 fw-semibold"
              >
                <FaShoppingCart className="me-2" />
                Cart
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
