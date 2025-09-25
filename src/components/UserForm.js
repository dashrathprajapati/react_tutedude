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
    <form className="needs-validation" onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={disabled}
        />
        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="d-flex gap-2 mt-3">
        <button type="submit" className="btn" disabled={disabled}>
          {initialData ? 'Update User' : 'Add User'}
        </button>
        {initialData && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={disabled}
          >
            Cancel
          </button>
        )}
      </div>

      {status && (
        <p
          className={`mt-3 ${
            status.type === 'success' ? 'text-success' : 'text-danger'
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
