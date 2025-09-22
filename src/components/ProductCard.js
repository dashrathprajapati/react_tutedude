import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="product-body">
        <h3>{product.title}</h3>
        <p className="muted">{product.brand}</p>
        <div className="price-ct">
          <strong>₹{product.price}</strong>
          <button className="btn" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
