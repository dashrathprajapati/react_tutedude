import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          className="card-img-top p-3"
          alt={product.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text fw-bold mt-auto">₹{product.price}</p>
        <button
          className="btn btn-danger mt-2"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
