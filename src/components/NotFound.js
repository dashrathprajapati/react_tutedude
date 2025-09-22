import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="notfound container-flex">
      <div>
        <h1>404</h1>
        <p>Page not found — the route you requested does not exist.</p>
        <Link to="/" className="button">Back to Home</Link>
      </div>
    </section>
  );
}