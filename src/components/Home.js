import React from "react";

export default function Home() {
  return (
    <div>
      <div className="p-5 mb-4 bg-white rounded-3 shadow-sm">
        <div className="container-fluid py-3">
          <h1 className="display-6">Welcome to ReactPortfolio</h1>
          <p className="lead">
            {" "}
            A small demo site using React Router (Create React App). Responsive
            layout, clean design, and focused components.
          </p>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Fast</h5>
              <p className="card-text">
                Lightweight build, easy routing, and responsive UI.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Accessible</h5>
              <p className="card-text">
                Semantic markup and keyboard-friendly navigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
