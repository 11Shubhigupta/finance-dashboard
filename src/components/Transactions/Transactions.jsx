import React, { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { CATEGORIES } from "../../data/transactions";
import TransactionModal from "../Modals/TransactionModal";
import {
  RiSearchLine, RiFilterLine, RiAddLine,
  RiEditLine, RiDeleteBinLine, RiArrowUpDownLine
} from "react-icons/ri";
import "./Transactions.css";

const Transactions = () => {
  const {
    filteredTransactions, role, deleteTransaction,
    searchQuery, setSearchQuery, filters, setFilters
  } = useFinance();

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (tx) => { setEditData(tx); setModalOpen(true); };
  const handleAdd = () => { setEditData(null); setModalOpen(true); };
  const handleDelete = (id) => {
    setDeleteId(id);
    setTimeout(() => { deleteTransaction(id); setDeleteId(null); }, 400);
  };

  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="transactions-section">
      <div className="tx-header">
        <div>
          <h2 className="section-title">Transactions</h2>
          <p className="section-subtitle">{filteredTransactions.length} records found</p>
        </div>
        <div className="tx-actions">
          {role === "admin" && (
            <button className="btn-add" onClick={handleAdd}>
              <RiAddLine /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="tx-toolbar">
        <div className="search-wrap">
          <RiSearchLine className="search-icon" />
          <input
            className="search-input"
            placeholder="Search by title or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <button className={`filter-toggle ${showFilters ? "active" : ""}`} onClick={() => setShowFilters(!showFilters)}>
          <RiFilterLine /> Filters
        </button>

        <select
          className="sort-select"
          value={filters.sortBy}
          onChange={e => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="date-desc">Latest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>

      {showFilters && (
        <div className="filter-panel animate-fade-up">
          <div className="filter-group">
            <label>Type</label>
            <div className="filter-pills">
              {["All", "income", "expense"].map(t => (
                <button
                  key={t}
                  className={`pill ${filters.type === t ? "active" : ""}`}
                  onClick={() => setFilters({ ...filters, type: t })}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>Category</label>
            <div className="filter-pills">
              {["All", ...CATEGORIES].map(c => (
                <button
                  key={c}
                  className={`pill ${filters.category === c ? "active" : ""}`}
                  onClick={() => setFilters({ ...filters, category: c })}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💸</div>
          <p>No transactions found</p>
          <span>Try changing your filters or search query</span>
        </div>
      ) : (
        <div className="tx-table-wrap">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Date <RiArrowUpDownLine /></th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount <RiArrowUpDownLine /></th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, i) => (
                <tr
                  key={tx.id}
                  className={`tx-row ${deleteId === tx.id ? "deleting" : ""}`}
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <td className="td-date">{fmtDate(tx.date)}</td>
                  <td className="td-title">{tx.title}</td>
                  <td>
                    <span className="category-chip">{tx.category}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${tx.type}`}>
                      {tx.type === "income" ? "↑" : "↓"} {tx.type}
                    </span>
                  </td>
                  <td className={`td-amount ${tx.type}`}>
                    {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                  </td>
                  {role === "admin" && (
                    <td className="td-actions">
                      <button className="action-btn edit" onClick={() => handleEdit(tx)}>
                        <RiEditLine />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(tx.id)}>
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
      />
    </div>
  );
};

export default Transactions;
