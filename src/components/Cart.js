import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, totalAmount, totalQuantity } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const proceedToPayment = () => {
    // navigate to /payment
    navigate('/payment');
  };

  return (
    <section>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/">Return to shop</Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {items.map(it => (
              <div className="cart-row" key={it.id}>
                <img src={it.image} alt={it.title} />
                <div className="cart-info">
                  <h4>{it.title}</h4>
                  <p className="muted">₹{it.price} × {it.qty} = ₹{it.price * it.qty}</p>
                  <div className="qty-controls">
                    <button onClick={() => dispatch(decreaseQty(it.id))}>-</button>
                    <span>{it.qty}</span>
                    <button onClick={() => dispatch(increaseQty(it.id))}>+</button>
                  </div>
                </div>
                <div>
                  <button className="linkish" onClick={() => dispatch(removeFromCart(it.id))}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Summary</h3>
            <p>Items: {totalQuantity}</p>
            <p>Total: ₹{totalAmount}</p>

            <div style={{display:'flex', gap:8}}>
              <Link to="/" className="btn">Continue Shopping</Link>
              <button className="btn primary" onClick={proceedToPayment}>Proceed to Payment</button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
