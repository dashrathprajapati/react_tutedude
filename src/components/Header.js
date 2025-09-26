import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../features/products/productsSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartQty = useSelector(s => s.cart.totalQuantity);
  const search = useSelector(s => s.products.search);

  const onSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
    navigate('/');
  };
  const [isOpen, setIsOpen] = useState(false);
  return (

    <header className="bg-light shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="fw-bold fs-4 me-2">SS</span>
          <span><strong>Shoe</strong>Shop</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-flex flex-grow-1 mx-3">
          <input
            aria-label="Search shoes"
            value={search}
            onChange={onSearchChange}
            placeholder="Search by name or brand..."
            className="form-control"
          />
        </div>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Shop</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link" onClick={() => setIsOpen(false)}>
                Cart ({cartQty})
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
