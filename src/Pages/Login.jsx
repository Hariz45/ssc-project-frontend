import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      alert(res.data.message || "Login successful");
      navigate("/menu");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input className="login-txt"
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          
        />

        <input className="login-txt"
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          
        />

        <button className="login-btn" type="submit">
          Login
        </button>
      </form>

      <p className="new-login-text">
        New user?{" "}
        <Link to="/register" className="font-semibold underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;