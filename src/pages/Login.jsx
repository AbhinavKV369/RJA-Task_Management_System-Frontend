import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password");
      return;
    }

    navigate(user?.role === "admin" ? "/admin" : "/employee");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0 rounded-4 w-100"
        style={{ maxWidth: "380px" }}>
        <div className="card-body p-4">
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary mb-1">Task Dashboard</h3>
            <p className="text-muted small mb-0">Sign in to your dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger py-2 text-center small">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small text-muted">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 fw-semibold">
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 bg-light border rounded text-center">
            <p className="small fw-semibold mb-1">Demo Credentials</p>
            <p className="small mb-1">
              <strong>Admin:</strong> admin@gmail.com / admin123
            </p>
            <p className="small mb-0">
              <strong>Employee:</strong> employee@gmail.com / emp123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
