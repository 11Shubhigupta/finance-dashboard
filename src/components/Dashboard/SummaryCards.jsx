import React, { useEffect, useRef } from "react";
import { useFinance } from "../../context/FinanceContext";
import { RiArrowUpLine, RiArrowDownLine, RiWalletLine, RiSaveLine } from "react-icons/ri";
import "./SummaryCards.css";

const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = 0; const end = value; const dur = 1200;
    const startTime = performance.now();
    const step = (now) => {
      const p = Math.min((now - startTime) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(start + (end - start) * ease));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span ref={ref}>{fmt(value)}</span>;
};

const SummaryCards = () => {
  const { balance, totalIncome, totalExpenses, savings } = useFinance();

  const cards = [
    {
      label: "Total Balance",
      value: balance,
      icon: RiWalletLine,
      color: "accent",
      change: "+8.2% this month",
      positive: true,
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: RiArrowUpLine,
      color: "success",
      change: "+12.5% vs last month",
      positive: true,
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: RiArrowDownLine,
      color: "danger",
      change: "-3.1% vs last month",
      positive: false,
    },
    {
      label: "Savings Rate",
      value: null,
      displayValue: `${savings}%`,
      icon: RiSaveLine,
      color: "gold",
      change: "Of total income",
      positive: true,
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`summary-card card color-${card.color}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="card-top">
              <span className="card-label">{card.label}</span>
              <div className={`card-icon-wrap icon-${card.color}`}>
                <Icon />
              </div>
            </div>
            <div className="card-value">
              {card.value !== null ? <AnimatedNumber value={card.value} /> : card.displayValue}
            </div>
            <div className={`card-change ${card.positive ? "positive" : "negative"}`}>
              {card.positive ? <RiArrowUpLine /> : <RiArrowDownLine />}
              <span>{card.change}</span>
            </div>
            <div className={`card-glow glow-${card.color}`} />
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
