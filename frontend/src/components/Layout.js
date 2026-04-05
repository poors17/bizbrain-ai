import React from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const path = location.pathname;

  const isPublicPage =
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path === "/features" ||
    path === "/about" ||
    path === "/contact";

  const isUser = user?.role === "USER";
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-transparent">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617]/70 backdrop-blur-lg border-b border-cyan-400/20 shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-cyan-300 tracking-wide drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
          >
            BizBrain AI
          </Link>

          {/* LINKS */}
          <div className="flex gap-8 text-sm font-medium text-slate-200">

            {isPublicPage && (
              <>
                <NavLink to="/" label="Home" />
                <NavLink to="/features" label="Features" />
                <NavLink to="/about" label="About" />
                <NavLink to="/contact" label="Contact" />
              </>
            )}

            {isUser && !isPublicPage && (
              <>
                <NavLink to="/user-dashboard" label="Dashboard" />
                <NavLink to="/upload-data" label="Upload" />
                <NavLink to="/prediction" label="Prediction" />
                <NavLink to="/reports" label="Reports" />
              </>
            )}

            {isAdmin && (
              <>
                <NavLink to="/admin-dashboard" label="Dashboard" />
                <NavLink to="/admin/users" label="Users" />
                <NavLink to="/admin/analytics" label="Analytics" />
                <NavLink to="/admin/config" label="System Configuration" />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <main className="pt-16">
        {children}
      </main>

    </div>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative text-slate-300 hover:text-white transition
               after:absolute after:-bottom-1 after:left-0 after:w-0
               after:h-[2px] after:bg-cyan-400 after:transition-all
               hover:after:w-full"
  >
    {label}
  </Link>
);

export default Layout;
