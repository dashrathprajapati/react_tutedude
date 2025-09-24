import React, { useState } from 'react';

function validateCardNumber(num) {
  return /^\d{13,19}$/.test(num.replace(/\s+/g, ''));
}

function validateExpiry(mmYY) {
  const m = mmYY.split('/');
  if (m.length !== 2) return false;
  const month = parseInt(m[0], 10);
  let year = parseInt(m[1], 10);
  if (year < 100) year += 2000;
  if (isNaN(month) || isNaN(year)) return false;
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const exp = new Date(year, month - 1, 1);
  exp.setMonth(exp.getMonth() + 1);
  return exp > now;
}

export default function CreditCardForm({ amount, onSuccess }) {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Enter cardholder name');
    if (!validateCardNumber(cardNumber)) return alert('Card number looks invalid');
    if (!validateExpiry(expiry)) return alert('Expiry date invalid or expired');
    if (!/^\d{3,4}$/.test(cvc)) return alert('CVC invalid');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const receipt = {
        amount,
        name,
        last4: cardNumber.slice(-4),
        timestamp: new Date().toISOString()
      };
      onSuccess(receipt);
    }, 1200);
  };

  return (
  <form className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label">Cardholder Name</label>
      <input
        className="form-control"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name on card"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Card Number</label>
      <input
        className="form-control"
        value={cardNumber}
        onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
        placeholder="4242424242424242"
        inputMode="numeric"
      />
    </div>

    <div className="row mb-3">
      <div className="col">
        <label className="form-label">Expiry (MM/YY)</label>
        <input
          className="form-control"
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
          placeholder="08/25"
        />
      </div>
      <div className="col-4">
        <label className="form-label">CVC</label>
        <input
          className="form-control"
          value={cvc}
          onChange={e => setCvc(e.target.value.replace(/\D/g, ''))}
          placeholder="123"
          inputMode="numeric"
        />
      </div>
    </div>

    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  </form>
  );
}
