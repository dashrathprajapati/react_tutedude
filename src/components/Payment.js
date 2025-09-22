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
    <section>
      <h1>Payment</h1>
      {items.length === 0 ? (
        <div>
          <p>Your cart is empty. Add items before paying.</p>
          <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="payment-grid">
          <div className="payment-cart">
            <h3>Order Review</h3>
            {items.map(it => (
              <div key={it.id} className="payment-row">
                <img src={it.image} alt={it.title} />
                <div>
                  <strong>{it.title}</strong>
                  <p className="muted">Qty: {it.qty} • ₹{it.price*it.qty}</p>
                </div>
              </div>
            ))}
            <div className="order-total">
              <strong>Total: ₹{totalAmount}</strong>
            </div>
            <Link to="/cart" className="btn">Back to Cart</Link>
          </div>

          <div className="payment-form">
            <h3>Enter Payment Details</h3>
            <CreditCardForm amount={totalAmount} onSuccess={onPaymentSuccess} />
          </div>
        </div>
      )}
    </section>
  );
}
