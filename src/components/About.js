import React from 'react';

export default function About() {
  return (
    <section className="about">
      <div className="about-hero container-flex">
        <div className="about-text">
          <h2>About This Demo</h2>
          <p>
            This project demonstrates an approachable React Router setup using Create React App. The
            UI is intentionally simple but attractive — a hero, content columns, and a profile card.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <strong>4</strong>
            <span>Pages</span>
          </div>
          <div className="stat">
            <strong>Responsive</strong>
            <span>All screen sizes</span>
          </div>
        </div>
      </div>

      <div className="about-content container-grid">
        <article>
          <h4>Design approach</h4>
          <p>
            Keep components small, use semantic structure, and write responsive CSS using flexible
            units and grid.
          </p>
        </article>

        <article>
          <h4>Routing</h4>
          <p>
            `react-router-dom` gives declarative routing. Use `NavLink` when you need active link styling.
          </p>
        </article>
      </div>
    </section>
  );
}