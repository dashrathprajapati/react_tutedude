import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../redux/productsSlice";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
  const dispatch = useDispatch();
  const { items = [], status } = useSelector((s) => s.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    if (selectedCategory) params.category = selectedCategory;
    setSearchParams(params, { replace: true });
  }, [query, selectedCategory, setSearchParams]);

  const categories = useMemo(() => {
    const map = {};
    (items || []).forEach((it) => {
      const c = it.category || "Uncategorized";
      map[c] = (map[c] || 0) + 1;
    });
    return Object.keys(map);
  }, [items]);

  const filtered = useMemo(() => {
    return (items || []).filter((it) => {
      if (selectedCategory && String(it.category || "") !== String(selectedCategory)) return false;
      if (query) {
        const q = query.toLowerCase();
        return (it.title || "").toLowerCase().includes(q) || (it.description || "").toLowerCase().includes(q);
      }
      return true;
    });
  }, [items, selectedCategory, query]);

  if (status === "loading") return <div className="container py-5 text-center">Loading...</div>;
  if (status === "failed") return <div className="container py-5 text-center text-danger">Failed to load products.</div>;

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Shop</h3>
        <div className="d-flex gap-2 w-100 w-md-auto">
          <input
            className="form-control"
            placeholder="Search dishes or ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="row g-3">
        {filtered.length === 0 ? (
          <div className="text-muted">No items match your search.</div>
        ) : (
          filtered.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
