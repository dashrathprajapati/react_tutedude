import React from 'react';

export default function Home() {
  return (
    <section className="home">
      <div className="hero container-flex">
        <div className="hero-text">
          <h1>Welcome to ReactPortfolio</h1>
          <p>
            A small demo site using React Router (Create React App). Responsive layout, clean design,
            and focused components.
          </p>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="card">
            <h3>Fast</h3>
            <p>Lightweight build, easy routing, and responsive UI.</p>
          </div>
          <div className="card">
            <h3>Accessible</h3>
            <p>Semantic markup and keyboard-friendly navigation.</p>
          </div>
        </div>
      </div>

      <div className="features container-grid">
        <article>
          <h4>Modern Router</h4>
          <p>React Router v6 for simple and predictable routing.</p>
        </article>
        <article>
          <h4>Clean Layout</h4>
          <p>Cards, hero section, and adaptable typography.</p>
        </article>
        <article>
          <h4>Deploy Ready</h4>
          <p>Build and deploy to Netlify or Vercel quickly.</p>
        </article>
      </div>
    </section>
  );
}