import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch products (only once)
  useEffect(() => {
    api.get("/api/products/")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🛒 Add to cart
  const addToCart = async (id) => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    try {
      await api.post("/api/cart/", {
        user_id: parseInt(user_id),
        product_id: id,
      });

      alert("Added to cart ✅");
      navigate("/cart");
    } catch (error) {
      console.log(error);
      alert("Error adding to cart ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">🛍️ Products</h3>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div className="card shadow h-100">
              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5>{p.name}</h5>
                <p className="fw-bold">₹{p.price}</p>

                <button
                  className="btn btn-success w-100"
                  onClick={() => addToCart(p.id)}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;