import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

export default function ProductList() {
  const products = useSelector(s => s.products.filtered);

  return (
    <section className="my-5">
      <h1 className="mb-4">Shop</h1>
      <div className="row g-4">
        {products.length === 0 ? (
          <p>No results found for your search.</p>
        ) : (
          products.map(p => (
            <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
