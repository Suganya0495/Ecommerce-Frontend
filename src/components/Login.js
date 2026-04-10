import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
       "https://suganyamanikandan1.pythonanywhere.com/api/login/",
        data
      );

      console.log(res.data);

      alert(res.data.message); // "Login success"

      // ✅ store user id
      localStorage.setItem("user_id", res.data.user_id);

      window.location.reload(); // 🔥 VERY IMPORTANT

    } catch (error) {
      console.log(error);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <input
          className="form-control mb-2"
          placeholder="Username"
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button className="btn btn-dark w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center mt-2">
          New user?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;