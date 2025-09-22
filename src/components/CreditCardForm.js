import React, { useState } from 'react';

function validateCardNumber(num) {
  // very simple check: 13-19 digits
  return /^\d{13,19}$/.test(num.replace(/\s+/g, ''));
}

function validateExpiry(mmYY) {
  // mm/yy or mm/yyyy
  const m = mmYY.split('/');
  if (m.length !== 2) return false;
  const month = parseInt(m[0], 10);
  let year = parseInt(m[1], 10);
  if (year < 100) year += 2000;
  if (isNaN(month) || isNaN(year)) return false;
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const exp = new Date(year, month - 1, 1);
  // set to last day of month
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
    // simple validations
    if (!name.trim()) return alert('Enter cardholder name');
    if (!validateCardNumber(cardNumber)) return alert('Card number looks invalid');
    if (!validateExpiry(expiry)) return alert('Expiry date invalid or expired');
    if (!/^\d{3,4}$/.test(cvc)) return alert('CVC invalid');

    // simulate payment processing
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
    <form className="card-form" onSubmit={handleSubmit}>
      <label>Cardholder Name
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name on card" />
      </label>

      <label>Card Number
        <input
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
          placeholder="4242424242424242"
          inputMode="numeric"
        />
      </label>

      <div style={{display:'flex', gap:10}}>
        <label style={{flex:1}}>Expiry (MM/YY)
          <input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="08/25" />
        </label>

        <label style={{width:110}}>CVC
          <input value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, ''))} placeholder="123" inputMode="numeric" />
        </label>
      </div>

      <div style={{marginTop:12}}>
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </div>
    </form>
  );
}
