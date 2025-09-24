import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import UserInfo from './components/UserInfo';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-light py-3 mt-auto">
        <div className="container text-center text-muted">
          © {new Date().getFullYear()} My React Router App — Built with CRA
        </div>
      </footer>
    </div>
  );
}

export default App;