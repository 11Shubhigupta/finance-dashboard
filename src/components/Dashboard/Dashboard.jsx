import React from "react";
import SummaryCards from "./SummaryCards";
import Charts from "../Charts/Charts";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <h1 className="welcome-title">HELLO 👋</h1>
          <p className="welcome-sub">Here's your financial snapshot for today</p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>
      <SummaryCards />
      <Charts />
    </div>
  );
};

export default Dashboard;
