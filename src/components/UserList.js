import React from 'react';

/**
 * Props:
 * - users: array
 * - onEdit: function(user)
 * - onDelete: function(id)
 */
export default function UserList({ users = [], onEdit, onDelete }) {
  if (!users || users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div className="user-list">
      <table className="user-table">
        <thead>
          <tr>
            <th style={{width:40}}>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th style={{width:160}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn" onClick={() => onEdit(u)}>Edit</button>
                <button className="btn danger" onClick={() => onDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
