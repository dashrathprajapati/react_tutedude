import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../redux/productsSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { items = [], status } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (status === "loading") return <div className="container py-5 text-center">Loading...</div>;
  if (status === "failed") return <div className="container py-5 text-center text-danger">Failed to load products.</div>;

  const byCategory = items.reduce((acc, it) => {
    const cat = it.category || "Uncategorized";
    acc[cat] = acc[cat] || [];
    acc[cat].push(it);
    return acc;
  }, {});

  const categories = Object.keys(byCategory);

  return (
    <div>
      

      <div 
        className="mb-4 text-white" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 py-5"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "10px" }}>
          <div>
            <h1 className="display-6 fw-bold">Food-Fusion</h1>
            <p className="mb-0 lead">Fresh meals, delivered fast. Explore our signature dishes and daily offers.</p>
          </div>
          <div className="text-center">
            <Link to="/shop" className="btn btn-light btn-lg text-danger fw-bold">Order Now</Link>
          </div>
        </div>
      </div>


      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Featured Categories</h3>
          <Link to="/shop" className="text-decoration-none">View all items</Link>
        </div>

        {categories.length === 0 ? (
          <div className="text-muted">No items available</div>
        ) : (
          categories.map((cat) => (
            <section key={cat} className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">{cat}</h5>
                <Link to={`/shop?category=${encodeURIComponent(cat)}`} className="small">View all</Link>
              </div>
              <div className="row g-3">
                {byCategory[cat].slice(0, 4).map((p) => (
                  <div className="col-6 col-sm-4 col-md-3" key={p.id}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
