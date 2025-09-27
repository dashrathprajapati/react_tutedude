import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0)
    return (
      <div className="container py-4">
        <h4>Your cart is empty</h4>
      </div>
    );

  return (
    <div className="container py-4">
      <h3 className="mb-3">Your Cart</h3>
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <CartItem key={i.id} item={i} />
          ))}
        </tbody>
      </table>
      <h5 className="mt-3">Total Amount: ₹{total}</h5>
    </div>
  );
}
