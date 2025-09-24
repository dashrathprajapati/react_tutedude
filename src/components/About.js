import React from 'react';

export default function About() {
  return (
    <div>
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-body">
              <h3>About This Demo</h3>
              <p>This project demonstrates an approachable React Router setup using Create React App. The
            UI is intentionally simple but attractive — a hero, content columns, and a profile card.</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5>Design approach</h5>
              <p>Use Bootstrap utility classes to rapidly build a responsive UI. Keep semantics and accessibility in mind.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Stats</h5>
              <p className="mb-1"><strong>Pages:</strong> 4</p>
              <p className="mb-0"><strong>Responsive:</strong> Yes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}