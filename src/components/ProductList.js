import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

export default function ProductList() {
  const products = useSelector(s => s.products.filtered);

  return (
    <section>
      <h1>Shop</h1>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No results found for your search.</p>
        ) : (
          products.map(p => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
}
