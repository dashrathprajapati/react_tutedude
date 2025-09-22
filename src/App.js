import React, { useEffect, useState } from 'react';
import api from './api';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

export default function App() {
  const [users, setUsers] = useState([]);            // local list of users
  const [loading, setLoading] = useState(false);     // loading for fetch
  const [error, setError] = useState(null);          // global error message
  const [editingUser, setEditingUser] = useState(null); // user object when editing
  const [processing, setProcessing] = useState(false);  // processing for create/update/delete

  // Fetch users on mount
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

  // Create user (POST)
  async function handleAddUser(data) {
    setProcessing(true);
    setError(null);
    try {
      const res = await api.post('/users', data);
      // JSONPlaceholder returns the posted object with an id (fake)
      const created = res.data;
      // Ensure we have a unique id in local list: if API didn't return id, create one
      if (!created.id) {
        created.id = (users.length ? Math.max(...users.map(u => u.id)) : 0) + 1;
      }
      // Add to local UI
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

  // Update user (PUT or PATCH)
  async function handleUpdateUser(id, data) {
    setProcessing(true);
    setError(null);
    try {
      // using PUT to replace or PATCH to partially update
      const res = await api.put(`/users/${id}`, data);
      const updated = res.data;
      // Update local list (JSONPlaceholder returns a mock response)
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

  // Delete user
  async function handleDeleteUser(id) {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;
    setProcessing(true);
    setError(null);
    try {
      await api.delete(`/users/${id}`);
      // Remove from local UI
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete user.');
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>User Management</h1>
      </header>

      <main className="container">
        <section className="top-row">
          <div className="left-col">
            <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
            <UserForm
              key={editingUser ? `edit-${editingUser.id}` : 'add-form'}
              initialData={editingUser}
              onCancel={() => setEditingUser(null)}
              onSubmit={async (formData) => {
                // Validate inside UserForm already; here call API
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
            {processing && <p className="info">Processing...</p>}
            {error && <p className="error">{error}</p>}
          </div>

          <div className="right-col">
            <h2>Users</h2>
            {loading ? (
              <div className="loading">Loading users...</div>
            ) : (
              <UserList
                users={users}
                onEdit={(user) => setEditingUser(user)}
                onDelete={(id) => handleDeleteUser(id)}
              />
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>CRUD Demo</p>
      </footer>
    </div>
  );
}
