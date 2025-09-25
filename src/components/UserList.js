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
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: 40 }}>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th style={{ width: 160 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEdit(u)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(u.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
