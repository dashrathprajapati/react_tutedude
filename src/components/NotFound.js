import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-5">
        <h1 className="display-1">404</h1>
        <p className="lead">Page not found — the route you requested does not exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}