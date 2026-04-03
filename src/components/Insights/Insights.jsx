import React, { useMemo } from "react";
import { useFinance } from "../../context/FinanceContext";
import { MONTHLY_BALANCE_DATA } from "../../data/transactions";
import {
  RiTrophyLine, RiBarChartLine, RiExchangeDollarLine,
  RiCalendarLine, RiArrowUpLine, RiArrowDownLine, RiAlertLine
} from "react-icons/ri";
import "./Insights.css";

const Insights = () => {
  const { categorySpending, totalIncome, totalExpenses, transactions } = useFinance();

  const insights = useMemo(() => {
    const topCategory = categorySpending[0];
    const lastTwo = MONTHLY_BALANCE_DATA.slice(-2);
    const monthChange = lastTwo.length >= 2
      ? ((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses * 100).toFixed(1)
      : 0;
    const expRatio = totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : 0;

    const days = new Set(transactions.filter(t => t.type === "expense").map(t => t.date.slice(0, 10))).size;
    const avgDaily = days > 0 ? (totalExpenses / days).toFixed(0) : 0;

    return { topCategory, monthChange: Number(monthChange), expRatio: Number(expRatio), avgDaily };
  }, [categorySpending, totalIncome, totalExpenses, transactions]);

  const cards = [
    {
      icon: RiTrophyLine,
      color: "gold",
      label: "Top Spending Category",
      value: insights.topCategory?.name || "—",
      sub: insights.topCategory ? `₹${insights.topCategory.value.toLocaleString("en-IN")} total` : "",
      tag: "🔥 Biggest spend",
    },
    {
      icon: RiBarChartLine,
      color: insights.monthChange > 0 ? "danger" : "success",
      label: "Monthly Comparison",
      value: `${Math.abs(insights.monthChange)}% ${insights.monthChange > 0 ? "more" : "less"}`,
      sub: "vs previous month expenses",
      tag: insights.monthChange > 0 ? "📈 Spending up" : "📉 Spending down",
    },
    {
      icon: RiExchangeDollarLine,
      color: insights.expRatio > 80 ? "danger" : insights.expRatio > 60 ? "gold" : "success",
      label: "Income vs Expense Ratio",
      value: `${insights.expRatio}%`,
      sub: "of income used for expenses",
      tag: insights.expRatio > 80 ? "⚠️ High spending" : insights.expRatio > 60 ? "🟡 Moderate" : "✅ Healthy",
    },
    {
      icon: RiCalendarLine,
      color: "accent",
      label: "Average Daily Spending",
      value: `₹${Number(insights.avgDaily).toLocaleString("en-IN")}`,
      sub: "per active spending day",
      tag: "📅 Daily avg",
    },
  ];

  return (
    <div className="insights-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Financial Insights</h2>
          <p className="section-subtitle">Smart analysis from your data</p>
        </div>
      </div>

      <div className="insights-grid">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`insight-card card color-${card.color}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="insight-top">
                <div className={`insight-icon icon-${card.color}`}><Icon /></div>
                <span className="insight-tag">{card.tag}</span>
              </div>
              <div className="insight-label">{card.label}</div>
              <div className="insight-value">{card.value}</div>
              <div className="insight-sub">{card.sub}</div>
              <div className={`insight-glow glow-${card.color}`} />
            </div>
          );
        })}
      </div>

      {/* Progress bar insights */}
      <div className="insights-bars card" style={{ marginTop: 20 }}>
        <h3 className="section-title" style={{ marginBottom: 20 }}>Category Budget Breakdown</h3>
        {categorySpending.slice(0, 6).map((cat, i) => {
          const pct = Math.min((cat.value / totalExpenses) * 100, 100).toFixed(1);
          const colors = ["#7c6af7", "#f7c16a", "#6af7b8", "#f76a6a", "#a78bfa", "#fbbf24"];
          return (
            <div key={cat.name} className="bar-row" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="bar-meta">
                <span className="bar-name">{cat.name}</span>
                <span className="bar-value">₹{cat.value.toLocaleString("en-IN")} · {pct}%</span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${pct}%`, background: colors[i % colors.length] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Insights;
