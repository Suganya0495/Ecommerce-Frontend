import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Orders from "./components/Orders";
import Success from "./components/Success";

function App() {
  const user = localStorage.getItem("user_id");

  return (
    <Router>
      {user && <Navbar />}

      <Routes>
        {/* 🔥 DEFAULT ROUTE */}
        <Route
          path="/"
          element={user ? <Products /> : <Navigate to="/login" />}
        />

        {/* 🔥 LOGIN ROUTE */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        {/* 🔥 REGISTER ROUTE */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        {/* 🔥 PROTECTED ROUTES */}
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />

        <Route
          path="/about"
          element={user ? <About /> : <Navigate to="/login" />}
        />

        <Route
          path="/contact"
          element={user ? <Contact /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={user ? <Orders /> : <Navigate to="/login" />}
        />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;