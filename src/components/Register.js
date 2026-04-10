import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({ username: "", password: "" });

  const handleRegister = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/register/", data);
    alert(res.data.message);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-info">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Register</h3>

        <input className="form-control mb-2"
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input type="password" className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="btn btn-primary w-100" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;