import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = Math.max(0, subtotal + delivery );


  function handleCheckout() {
    if (!items || items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    toast.success(`Order placed! Total: ₹${total}`);
    items.forEach((it) => dispatch(removeFromCart(it.id)));
    setTimeout(() => navigate("/"), 900);
  }

  if (!items || items.length === 0)
    return (
      <div className="container py-5">
        <div className="card shadow-sm p-4 text-center">
          <h4 className="mb-3">Your cart is empty</h4>
          <p className="text-muted mb-3">Add delicious meals from the Menu to get started.</p>
          <Link to="/shop" className="btn btn-danger btn-lg">Browse Menu</Link>
        </div>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Your Cart</h3>
        <Link to="/shop" className="text-decoration-none">Continue Shopping</Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4 d-none d-md-block">
            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: 90 }}>Item</th>
                    <th>Details</th>
                    <th style={{ width: 120 }}>Price</th>
                    <th style={{ width: 120 }}>Qty</th>
                    <th style={{ width: 120 }}>Total</th>
                    <th style={{ width: 110 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i) => (
                    <CartItem key={i.id} item={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-md-none">
            {items.map((i) => (
              <div key={i.id} className="card mb-3 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-4 p-2">
                    <img src={i.image} alt={i.title} className="img-fluid rounded" style={{ height: 96, width: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="col-8 p-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="fw-semibold">{i.title}</div>
                        <div className="text-muted small">{i.category}</div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-danger">₹{i.price}</div>
                        <div className="small text-muted">₹{i.price * i.qty}</div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex gap-2 align-items-center">
                        <button className="btn btn-outline-secondary btn-sm">-</button>
                        <div className="px-2">{i.qty}</div>
                        <button className="btn btn-outline-secondary btn-sm">+</button>
                      </div>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(removeFromCart(i.id))}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-3 shadow-sm">
            <h6 className="mb-3">Special Instructions</h6>
            <textarea className="form-control" rows="3" placeholder="Add delivery notes (e.g., no onions, drop at door)"></textarea>
          </div>
        </div>

        <aside className="col-lg-4">
          <div className="card shadow-sm p-3 mb-3">
            <h5 className="mb-3">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <div className="text-muted">Subtotal</div>
              <div>₹{subtotal}</div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <div className="text-muted">Delivery</div>
              <div>{delivery === 0 ? <span className="text-success">Free</span> : `₹${delivery}`}</div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-bold">Total</div>
              <div className="fs-5 text-danger fw-bold">₹{total}</div>
            </div>

            <button className="btn btn-danger w-100 btn-lg mb-2" onClick={handleCheckout}>Proceed to Checkout</button>
            <Link to="/menu" className="btn btn-outline-secondary w-100">Continue Shopping</Link>
          </div>

          <div className="card shadow-sm p-3">
            <h6 className="mb-2">Payment & Delivery</h6>
            <div className="small text-muted mb-2">Secure payment, fast delivery</div>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge bg-light text-dark border">UPI</span>
              <span className="badge bg-light text-dark border">Card</span>
              <span className="badge bg-light text-dark border">Cash</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
