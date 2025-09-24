import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Payment from './components/Payment';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container my-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-light py-3 mt-auto">
        <div className="container text-center text-muted">
          © {new Date().getFullYear()} ShoeShop — Demo
        </div>
      </footer>
    </div>
  );
}

export default App;
