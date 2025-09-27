import React from "react";
export default function Footer() {
  return (
    <footer className="bg-light py-3 mt-4 border-top">
      <div className="container container-max text-center text-muted">
        © {new Date().getFullYear()} Finance Tracker
      </div>
    </footer>
  );
}
