import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

const Navbar = () => {
  const location = useLocation();
  const {user,logout} = useAuth();

  const navLinks = [
    user?.role === "admin" ?
    { name: "Dashboard", path: "#" }:{},
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="navbar navbar-expand-lg shadow-lg"
      style={{
        background: "linear-gradient(90deg, #0f172a, #1e293b)",
        transition: "all 0.3s",
      }}>
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold text-white"
          to="/"
          style={{ fontSize: "1.4rem" }}>
          Task Management
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }} // white icon
          />
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.name}>
                <Link
                  to={link.path}
                  className={`nav-link ${
                    isActive(link.path) ? "text-warning fw-bold" : "text-white"
                  }`}
                  style={{
                    transition: "all 0.3s",
                    position: "relative",
                  }}>
                  {link.name}
                  {/* Underline hover effect */}
                  <span
                    className="position-absolute start-0 bottom-0 w-0 h-1 bg-warning"
                    style={{
                      transition: "0.3s",
                    }}></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-white small">Hello, {user?.name}</span>
            <button
              className="btn btn-warning btn-sm fw-semibold"
              style={{
                borderRadius: "0.5rem",
                padding: "0.35rem 0.75rem",
                transition: "all 0.3s",
              }}
              onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
