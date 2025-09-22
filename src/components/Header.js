import React from 'react';
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
    // Optionally keep user on product list page
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="header-inner container-flex">
        <Link to="/" className="logo">
          <span className="logo-mark">SS</span>
          <div className="logo-text"><strong>Shoe</strong>Shop</div>
        </Link>

        <div style={{flex:1, marginLeft:16, marginRight:16}}>
          <input
            aria-label="Search shoes"
            value={search}
            onChange={onSearchChange}
            placeholder="Search by name or brand..."
            className="search-input"
          />
        </div>

        <nav className="nav">
          <Link to="/" className="navlink">Shop</Link>
          <Link to="/cart" className="navlink">Cart ({cartQty})</Link>
        </nav>
      </div>
    </header>
  );
}
