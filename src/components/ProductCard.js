import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="text-muted mb-2">{product.brand}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>₹{product.price}</strong>
          <button
            className="btn btn-sm"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
