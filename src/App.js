import React, { useEffect, useState } from 'react';
import api from './api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load users. Try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser(data) {
    setProcessing(true);
    setError(null);
    try {
      const res = await api.post('/users', data);
      const created = res.data;
      if (!created.id) {
        created.id = (users.length ? Math.max(...users.map(u => u.id)) : 0) + 1;
      }
      setUsers(prev => [created, ...prev]);
      return { success: true };
    } catch (err) {
      console.error(err);
      setError('Failed to add user.');
      return { success: false };
    } finally {
      setProcessing(false);
    }
  }

  async function handleUpdateUser(id, data) {
    setProcessing(true);
    setError(null);
    try {
      const res = await api.put(`/users/${id}`, data);
      const updated = res.data;
      setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updated } : u)));
      setEditingUser(null);
      return { success: true };
    } catch (err) {
      console.error(err);
      setError('Failed to update user.');
      return { success: false };
    } finally {
      setProcessing(false);
    }
  }

  async function handleDeleteUser(id) {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;
    setProcessing(true);
    setError(null);
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete user.');
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white py-3 mb-4">
        <div className="container-fluid">
          <h1 className="h3 mb-0">User Management</h1>
        </div>
      </header>

      <main className="container-fluid flex-grow-1">
        <div className="row">
          <div className="col-md-5 mb-4">
            <h2 className="h5 mb-3">{editingUser ? 'Edit User' : 'Add User'}</h2>
            <UserForm
              key={editingUser ? `edit-${editingUser.id}` : 'add-form'}
              initialData={editingUser}
              onCancel={() => setEditingUser(null)}
              onSubmit={async (formData) => {
                if (editingUser) {
                  const result = await handleUpdateUser(editingUser.id, formData);
                  return result;
                } else {
                  const result = await handleAddUser(formData);
                  return result;
                }
              }}
              disabled={processing}
            />
            {processing && <p className="text-info mt-2">Processing...</p>}
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>

          <div className="col-md-7 mb-4">
            <h2 className="h5 mb-3">Users</h2>
            {loading ? (
              <div className="text-muted">Loading users...</div>
            ) : (
              <UserList
                users={users}
                onEdit={(user) => setEditingUser(user)}
                onDelete={(id) => handleDeleteUser(id)}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-light py-3 mt-auto border-top">
        <div className="container text-center">
          <p className="mb-0">CRUD Demo</p>
        </div>
      </footer>
    </div>
  );
}
