import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { INITIAL_TRANSACTIONS } from "../data/transactions";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {

  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ category: "All", type: "All", sortBy: "date-desc" });
  const [activeSection, setActiveSection] = useState("dashboard");

  /* ✅ UPDATED — mobile me default closed, laptop me open */
  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth > 900
  );

  /* ✅ NEW — screen resize handle karega */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpenses;

  const savings = totalIncome > 0
    ? ((balance / totalIncome) * 100).toFixed(1)
    : 0;

  const addTransaction = (tx) => {
    setTransactions(prev => [{ ...tx, id: Date.now() }, ...prev]);
  };

  const editTransaction = (id, updated) => {
    setTransactions(prev =>
      prev.map(t =>
        t.id === id ? { ...t, ...updated } : t
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev =>
      prev.filter(t => t.id !== id)
    );
  };

  const filteredTransactions = useMemo(() => {

    let list = [...transactions];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    if (filters.category !== "All")
      list = list.filter(t => t.category === filters.category);

    if (filters.type !== "All")
      list = list.filter(t => t.type === filters.type);

    if (filters.sortBy === "date-desc")
      list.sort((a, b) => new Date(b.date) - new Date(a.date));

    else if (filters.sortBy === "date-asc")
      list.sort((a, b) => new Date(a.date) - new Date(b.date));

    else if (filters.sortBy === "amount-desc")
      list.sort((a, b) => b.amount - a.amount);

    else if (filters.sortBy === "amount-asc")
      list.sort((a, b) => a.amount - b.amount);

    return list;

  }, [transactions, searchQuery, filters]);

  const categorySpending = useMemo(() => {

    const map = {};

    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        map[t.category] =
          (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

  }, [transactions]);

  return (
    <FinanceContext.Provider value={{

      transactions,
      filteredTransactions,

      role,
      setRole,

      darkMode,
      setDarkMode,

      searchQuery,
      setSearchQuery,

      filters,
      setFilters,

      activeSection,
      setActiveSection,

      sidebarOpen,
      setSidebarOpen,

      totalIncome,
      totalExpenses,
      balance,
      savings,

      addTransaction,
      editTransaction,
      deleteTransaction,

      categorySpending

    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () =>
  useContext(FinanceContext);