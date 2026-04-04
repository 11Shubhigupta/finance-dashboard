import React, { useEffect, useState } from "react";
import { FinanceProvider, useFinance } from "./context/FinanceContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions";
import Charts from "./components/Charts/Charts";
import Insights from "./components/Insights/Insights";
import "./index.css";

const AppContent = () => {
  const { activeSection, darkMode, sidebarOpen } = useFinance();

  /* ✅ detect mobile screen */
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 900
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  /* ✅ listen resize */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      {/* ✅ Mobile par sidebar margin remove */}
      <div
        className={`main-area ${
          !sidebarOpen && !isMobile
            ? "sidebar-collapsed"
            : ""
        }`}
      >
        <Navbar />

        <main className="content-area">
          {activeSection === "dashboard" && (
            <Dashboard />
          )}

          {activeSection === "transactions" && (
            <Transactions />
          )}

          {activeSection === "charts" && (
            <div>
              <div className="dashboard-welcome">
                <div>
                  <h1
                    className="welcome-title"
                    style={{ fontSize: "1.6rem" }}
                  >
                    Analytics
                  </h1>

                  <p className="section-subtitle">
                    Visual breakdown of your finances
                  </p>
                </div>
              </div>

              <Charts />
            </div>
          )}

          {activeSection === "insights" && (
            <Insights />
          )}
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <FinanceProvider>
    <AppContent />
  </FinanceProvider>
);

export default App;