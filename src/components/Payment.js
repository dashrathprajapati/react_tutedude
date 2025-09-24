import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreditCardForm from './CreditCardForm';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';

export default function Payment() {
  const { items, totalAmount } = useSelector(s => s.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onPaymentSuccess = (paymentData) => {
    // For demo, we just clear cart and show success message
    dispatch(clearCart());
    alert('Payment successful!\n\n' + JSON.stringify(paymentData, null, 2));
    navigate('/');
  };

  return (
    <section className="container my-4">
    <h1 className="mb-4">Payment</h1>
    {items.length === 0 ? (
      <div className="alert alert-info">
        <p className="mb-3">Your cart is empty. Add items before paying.</p>
        <Link to="/" className="btn btn-primary">Go Shopping</Link>
      </div>
    ) : (
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Order Review</h3>
              {items.map(it => (
                <div key={it.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="me-3 rounded"
                    style={{ width: 60, height: 60, objectFit: 'cover' }}
                  />
                  <div>
                    <strong>{it.title}</strong>
                    <p className="text-muted mb-0">
                      Qty: {it.qty} • ₹{it.price * it.qty}
                    </p>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
                <strong>Total:</strong>
                <strong>₹{totalAmount}</strong>
              </div>
              <Link to="/cart" className="btn btn-outline-secondary w-100">
                Back to Cart
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">Enter Payment Details</h3>
              <CreditCardForm amount={totalAmount} onSuccess={onPaymentSuccess} />
            </div>
          </div>
        </div>
      </div>
    )}
    </section>
  );
}
