import React, { useEffect, useState } from 'react';

/**
 * Props:
 * - initialData: { id, name, email, username } or null
 * - onSubmit: async function(formData) -> { success: boolean }
 * - onCancel: function()
 * - disabled: boolean
 */
export default function UserForm({ initialData = null, onSubmit, onCancel, disabled = false }) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [username, setUsername] = useState(initialData?.username ?? '');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // success or failure message

  useEffect(() => {
    // populate if initialData changes
    setName(initialData?.name ?? '');
    setEmail(initialData?.email ?? '');
    setUsername(initialData?.username ?? '');
    setErrors({});
    setStatus(null);
  }, [initialData]);

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!username.trim()) errs.username = 'Username is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Email is invalid';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;
    const payload = { name: name.trim(), email: email.trim(), username: username.trim() };
    try {
      const res = await onSubmit(payload);
      if (res && res.success) {
        setStatus({ type: 'success', message: initialData ? 'User updated' : 'User added' });
        // reset input if adding new
        if (!initialData) {
          setName('');
          setEmail('');
          setUsername('');
        }
      } else {
        setStatus({ type: 'error', message: 'Operation failed' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Unexpected error' });
    }
  }

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} />
        {errors.name && <small className="field-error">{errors.name}</small>}
      </label>

      <label>
        Username
        <input value={username} onChange={(e) => setUsername(e.target.value)} disabled={disabled} />
        {errors.username && <small className="field-error">{errors.username}</small>}
      </label>

      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} />
        {errors.email && <small className="field-error">{errors.email}</small>}
      </label>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit" className="btn primary" disabled={disabled}>
          {initialData ? 'Update User' : 'Add User'}
        </button>
        {initialData && (
          <button type="button" className="btn" onClick={onCancel} disabled={disabled}>
            Cancel
          </button>
        )}
      </div>

      {status && (
        <p className={status.type === 'success' ? 'info' : 'error'} style={{ marginTop: 8 }}>
          {status.message}
        </p>
      )}
    </form>
  );
}
