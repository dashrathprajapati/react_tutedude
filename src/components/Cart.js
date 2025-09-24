import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, totalAmount, totalQuantity } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const proceedToPayment = () => {
    navigate('/payment');
  };

return (
    <section className="container my-5">
      <h1 className="mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="alert alert-info">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-link">Return to shop</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {items.map(it => (
              <div className="card mb-3" key={it.id}>
                <div className="row g-0 align-items-center">
                  <div className="col-3 col-md-2">
                    <img src={it.image} alt={it.title} className="img-fluid rounded-start" />
                  </div>
                  <div className="col-9 col-md-7">
                    <div className="card-body">
                      <h5 className="card-title">{it.title}</h5>
                      <p className="text-muted">
                        ₹{it.price} × {it.qty} = ₹{it.price * it.qty}
                      </p>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => dispatch(decreaseQty(it.id))}
                        >
                          -
                        </button>
                        <span className="btn btn-light btn-sm disabled">{it.qty}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => dispatch(increaseQty(it.id))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-3 text-md-end p-3">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(removeFromCart(it.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="col-lg-4">
            <div className="card p-3 shadow-sm">
              <h3 className="h5">Summary</h3>
              <p>Items: {totalQuantity}</p>
              <p>Total: ₹{totalAmount}</p>
              <div className="d-flex gap-2">
                <Link to="/" className="btn btn-outline-primary">
                  Continue Shopping
                </Link>
                <button className="btn btn-primary" onClick={proceedToPayment}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
