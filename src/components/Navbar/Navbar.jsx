import React from "react";
import { useFinance } from "../../context/FinanceContext";
import { RiSunLine, RiMoonLine, RiShieldUserLine, RiEyeLine, RiMenuLine } from "react-icons/ri";
import "./Navbar.css";

const Navbar = () => {
  const { role, setRole, darkMode, setDarkMode, activeSection, setSidebarOpen, sidebarOpen } = useFinance();

  const sectionTitles = {
    dashboard: "Overview",
    transactions: "Transactions",
    charts: "Analytics",
    insights: "Insights",
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <RiMenuLine />
        </button>
        <div className="navbar-breadcrumb">
          <span className="breadcrumb-root">Finova</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{sectionTitles[activeSection]}</span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Role Toggle */}
        <div className="role-toggle">
          <button
            className={`role-btn ${role === "viewer" ? "active-viewer" : ""}`}
            onClick={() => setRole("viewer")}
          >
            <RiEyeLine />
            <span>Viewer</span>
          </button>
          <button
            className={`role-btn ${role === "admin" ? "active-admin" : ""}`}
            onClick={() => setRole("admin")}
          >
            <RiShieldUserLine />
            <span>Admin</span>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <RiSunLine /> : <RiMoonLine />}
        </button>

        {/* Avatar */}
        <div className="nav-avatar">
          <span>{role === "admin" ? "A" : "V"}</span>
          <div className={`avatar-dot ${role === "admin" ? "admin" : "viewer"}`} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
