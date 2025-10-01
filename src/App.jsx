import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";

const Home = lazy(() => import("./pages/Home"));

const Cart = lazy(() => import("./pages/Cart"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<p className="text-center py-4">Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}
