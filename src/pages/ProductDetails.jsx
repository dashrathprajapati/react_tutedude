import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    axios.get("https://68da3fef23ebc87faa2f73d6.mockapi.io/food-api").then((res) => {
      if (!mounted) return;
      const list = Array.isArray(res.data) ? res.data : [];
      const found = list.find((p) => String(p.id) === String(id)) || null;
      setProduct(found);
      if (found) {
        const same = list.filter((p) => p.category === found.category && String(p.id) !== String(found.id)).slice(0, 4);
        setRelated(same);
      } else {
        setRelated([]);
      }
    }).catch(() => {
      setProduct(null);
      setRelated([]);
    });
    return () => (mounted = false);
  }, [id]);

  if (!product) return <div className="container py-5 text-center">Loading...</div>;

  const images = Array.isArray(product.images) && product.images.length ? product.images : [product.image];
  const rawRating = product.rating;
  const rating = rawRating && typeof rawRating === "object" && rawRating.rate ? Number(rawRating.rate) : Number(rawRating || 4.2);
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0">
            <div className="p-3 bg-light rounded">
              <img src={images[galleryIndex]} alt={product.title} className="img-fluid rounded w-100" style={{ maxHeight: 420, objectFit: "cover" }} />
            </div>
            {images.length > 1 && (
              <div className="d-flex gap-2 mt-3">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    className={`btn p-0 border ${idx === galleryIndex ? "border-danger" : "border-0"}`}
                    style={{ width: 72, height: 72, overflow: "hidden" }}
                    onClick={() => setGalleryIndex(idx)}
                  >
                    <img src={src} alt={`${product.title}-${idx}`} className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <h2 className="fw-bold">{product.title}</h2>
              <div className="mb-2">
                <span className="badge bg-danger me-2">{product.category || "Main"}</span>
                {product.veg ? <span className="badge bg-success me-2">Veg</span> : <span className="badge bg-secondary me-2">Non-Veg</span>}
                <small className="text-muted">Prep: {product.prepTime || "20-30 mins"}</small>
              </div>
            </div>
            <div className="text-end">
              <h3 className="text-danger">₹{product.price}</h3>
              <div className="text-muted small">Inclusive of taxes</div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 my-3">
            <div className="d-flex align-items-center">
              {stars.map((s) => (
                <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#ffbf00" : "none"} stroke="#ffbf00" strokeWidth="1">
                  <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596 0 9.748l8.332-1.73z" />
                </svg>
              ))}
              <span className="ms-2 small text-muted">{Number(rating).toFixed(1)}</span>
            </div>

            <div className="vr"></div>

            <div className="small text-muted">Sold: {product.sold ?? 120}</div>
          </div>

          <p className="text-muted">{product.description}</p>

          <div className="d-flex align-items-center gap-3 mt-4">
            <div className="input-group" style={{ width: 140 }}>
              <button className="btn btn-outline-secondary" type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
              <input className="form-control text-center" value={qty} readOnly />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>

            <button className="btn btn-danger btn-lg d-flex align-items-center px-4" onClick={() => dispatch(addToCart({ ...product, qty }))}>
              Add to Cart
              <span className="badge bg-dark text-white ms-3">{qty}</span>
            </button>

            <div className="ms-auto text-muted small">
              <div>Delivery in <strong>{product.deliveryTime || "30-45 mins"}</strong></div>
              <div>Free delivery over ₹{product.freeDeliveryOver ?? 499}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="accordion" id="detailsAcc">
              <div className="accordion-item">
                <h2 className="accordion-header" id="ingHeading">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ingCollapse" aria-expanded="false" aria-controls="ingCollapse">
                    Ingredients & Nutrition
                  </button>
                </h2>
                <div id="ingCollapse" className="accordion-collapse collapse" aria-labelledby="ingHeading" data-bs-parent="#detailsAcc">
                  <div className="accordion-body">
                    <ul className="list-unstyled mb-0">
                      {(product.ingredients || ["Fresh ingredients"]).map((it, i) => <li key={i}>• {it}</li>)}
                    </ul>
                    <div className="mt-2 small text-muted">Calories: {product.calories ?? "250 kcal"}</div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="revHeading">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#revCollapse" aria-expanded="false" aria-controls="revCollapse">
                    Reviews
                  </button>
                </h2>
                <div id="revCollapse" className="accordion-collapse collapse" aria-labelledby="revHeading" data-bs-parent="#detailsAcc">
                  <div className="accordion-body">
                    {(product.reviews || [{ user: "Asha", text: "Tasty and fresh!" }]).map((r, i) => (
                      <div key={i} className="mb-2">
                        <div className="fw-semibold">{r.user}</div>
                        <div className="small text-muted">{r.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-3">You might also like</h5>
          <div className="row g-3">
            {related.map((r) => (
              <div key={r.id} className="col-6 col-sm-4 col-md-3">
                <Link to={`/product/${r.id}`} className="text-decoration-none text-dark">
                  <div className="card h-100">
                    <img src={r.image} alt={r.title} className="card-img-top" style={{ height: 140, objectFit: "cover" }} />
                    <div className="card-body p-2">
                      <div className="small text-muted">{r.category}</div>
                      <div className="fw-semibold small">{r.title}</div>
                      <div className="text-danger fw-bold">₹{r.price}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
