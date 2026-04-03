import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { MONTHLY_BALANCE_DATA } from "../../data/transactions";
import "./Charts.css";

const COLORS = ["#7c6af7", "#f7c16a", "#6af7b8", "#f76a6a", "#a78bfa", "#fbbf24", "#34d399"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="tooltip-label">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="tooltip-value">
          {p.name}: ₹{p.value?.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  if (percent < 0.05) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Charts = () => {
  const { categorySpending } = useFinance();
  const [activeChart, setActiveChart] = useState("line");

  return (
    <div className="charts-section">
      <div className="charts-grid">
        {/* Balance Trend */}
        <div className="chart-card card">
          <div className="chart-header">
            <div>
              <h3 className="section-title">Balance Trend</h3>
              <p className="section-subtitle">Monthly overview · 2024</p>
            </div>
            <div className="chart-tabs">
              {["line", "bar"].map(t => (
                <button
                  key={t}
                  className={`chart-tab ${activeChart === t ? "active" : ""}`}
                  onClick={() => setActiveChart(t)}
                >
                  {t === "line" ? "Line" : "Bar"}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={240}>
              {activeChart === "line" ? (
                <LineChart data={MONTHLY_BALANCE_DATA} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "#8888aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#8888aa", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="income" stroke="#6af7b8" strokeWidth={2.5} dot={{ r: 4, fill: "#6af7b8" }} name="Income" activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expenses" stroke="#f76a6a" strokeWidth={2.5} dot={{ r: 4, fill: "#f76a6a" }} name="Expenses" activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="balance" stroke="#7c6af7" strokeWidth={3} dot={{ r: 5, fill: "#7c6af7" }} name="Balance" activeDot={{ r: 7 }} />
                </LineChart>
              ) : (
                <BarChart data={MONTHLY_BALANCE_DATA} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "#8888aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#8888aa", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="income" fill="#6af7b8" radius={[6,6,0,0]} name="Income" />
                  <Bar dataKey="expenses" fill="#f76a6a" radius={[6,6,0,0]} name="Expenses" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {[{ label: "Income", color: "#6af7b8" }, { label: "Expenses", color: "#f76a6a" }, { label: "Balance", color: "#7c6af7" }].map(l => (
              <div key={l.label} className="legend-item">
                <span className="legend-dot" style={{ background: l.color }} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Breakdown Pie */}
        <div className="chart-card card">
          <div className="chart-header">
            <div>
              <h3 className="section-title">Spending Breakdown</h3>
              <p className="section-subtitle">By category</p>
            </div>
          </div>
          <div className="chart-container pie-container">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={CustomPieLabel}
                >
                  {categorySpending.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Spent"]} contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text-primary)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-legend">
            {categorySpending.slice(0, 6).map((item, i) => (
              <div key={item.name} className="pie-legend-item">
                <span className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="pie-legend-name">{item.name}</span>
                <span className="pie-legend-val">₹{item.value.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
