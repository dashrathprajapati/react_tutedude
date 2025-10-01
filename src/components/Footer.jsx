import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-danger">Food-Fusion</h5>
            <p className="small">
              Delicious food delivered at your doorstep. Fresh, Fast, and Fusion of Flavors.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-danger">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/menu" className="text-light text-decoration-none">Menu</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-danger">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-light fs-5"><FaFacebookF /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
              <a href="#" className="text-light fs-5"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className="border-top border-secondary mt-3 pt-3 text-center">
          <p className="mb-0 small">© 2025 Food-Fusion. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
