import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 text-danger">404</h1>
      <h3>Oops! Page Not Found</h3>
      <p className="mt-3">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-danger mt-3">
        Go Back Home
      </Link>
    </div>
  );
}
