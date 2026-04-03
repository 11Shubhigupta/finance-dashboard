import React, { useState, useEffect } from "react";
import { useFinance } from "../../context/FinanceContext";
import { CATEGORIES } from "../../data/transactions";
import { RiCloseLine, RiAddLine, RiSaveLine } from "react-icons/ri";
import "./TransactionModal.css";

const empty = { title: "", amount: "", date: "", category: "Food", type: "expense" };

const TransactionModal = ({ isOpen, onClose, editData }) => {
  const { addTransaction, editTransaction } = useFinance();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setForm({ ...editData, amount: String(editData.amount) });
    else setForm(empty);
    setErrors({});
  }, [editData, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = "Valid amount required";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const data = { ...form, amount: Number(form.amount) };
      if (editData) editTransaction(editData.id, data);
      else addTransaction(data);
      setLoading(false);
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div className="modal-box animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{editData ? "Edit Transaction" : "New Transaction"}</h2>
          <button className="modal-close" onClick={onClose}><RiCloseLine /></button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="e.g. Grocery Shopping"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className={errors.title ? "error" : ""}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>
            <div className="form-group">
              <label>Amount (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                className={errors.amount ? "error" : ""}
              />
              {errors.amount && <span className="form-error">{errors.amount}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className={errors.date ? "error" : ""}
              />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Type</label>
            <div className="type-toggle">
              {["income", "expense"].map(t => (
                <button
                  key={t}
                  className={`type-btn ${form.type === t ? `active-${t}` : ""}`}
                  onClick={() => setForm({ ...form, type: t })}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="btn-spinner" /> : editData ? <><RiSaveLine /> Save Changes</> : <><RiAddLine /> Add Transaction</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
