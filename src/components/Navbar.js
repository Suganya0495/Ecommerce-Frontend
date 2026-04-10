import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  

  const logout = () => {
    localStorage.removeItem("user_id");
    // 🔥 force redirect to login page
  window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Hi,Suganya Manikandan</Link>

      <div>
        <Link className="btn btn-outline-light mx-2" to="/">Home</Link>
        <Link className="btn btn-outline-light mx-2" to="/about">About</Link>
        <Link className="btn btn-outline-light mx-2" to="/contact">Contact</Link>
        <Link className="btn btn-warning mx-2" to="/cart">Cart</Link>
        <Link className="btn btn-warning mx-2" to="/orders">Orders</Link>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;