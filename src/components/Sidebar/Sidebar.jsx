import React from "react";
import { useFinance } from "../../context/FinanceContext";
import {
  RiDashboardLine, RiExchangeLine, RiLineChartLine,
  RiLightbulbLine, RiMenuFoldLine, RiMenuUnfoldLine,
  RiWalletLine
} from "react-icons/ri";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: RiDashboardLine },
  { id: "transactions", label: "Transactions", icon: RiExchangeLine },
  { id: "charts", label: "Analytics", icon: RiLineChartLine },
  { id: "insights", label: "Insights", icon: RiLightbulbLine },
];

const Sidebar = () => {
  const { activeSection, setActiveSection, sidebarOpen, setSidebarOpen, darkMode } = useFinance();

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-logo" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <div className="logo-icon">
          <RiWalletLine />
        </div>
        {sidebarOpen && <span className="logo-text">Finova</span>}
        <button className="collapse-btn">
          {sidebarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
              style={{ animationDelay: `${i * 0.07}s` }}
              title={!sidebarOpen ? item.label : ""}
            >
              <span className="nav-icon"><Icon /></span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
              {isActive && <span className="nav-indicator" />}
            </button>
          );
        })}
      </nav>

      {sidebarOpen && (
        <div className="sidebar-footer">
          <div className="sidebar-brand-tag">Finance OS v1.0</div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
