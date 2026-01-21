import React from "react";

const Footer = () => {
  return (
    <footer
      className="mt-auto py-4"
      style={{
        background: "linear-gradient(90deg, #0f172a, #1e293b)",
        color: "#f8fafc",
      }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Left side */}
        <span className="small">
          &copy; {new Date().getFullYear()} Task Dashboard. All rights reserved.
        </span>

        {/* Right side links */}
        <div className="mt-2 mt-md-0">
          <a
            href="#"
            className="text-warning me-3 text-decoration-none small fw-semibold"
            style={{ transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.target.style.color = "#facc15")}
            onMouseLeave={(e) => (e.target.style.color = "#ffc107")}>
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-warning text-decoration-none small fw-semibold"
            style={{ transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.target.style.color = "#facc15")}
            onMouseLeave={(e) => (e.target.style.color = "#ffc107")}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
