"use client";
import React, { useMemo, useState } from "react";

type CategoryOption = { id: string; name: string };

type ExpenseFormProps = {
    categories: CategoryOption[];
    defaultDate?: string;
    onSubmit: (payload: { categoryId: string; amount: number; date: string; note?: string }) => void;
    onClose: () => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ categories, defaultDate, onSubmit, onClose }) => {
    const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
    const [amount, setAmount] = useState<string>("");
    const [date, setDate] = useState<string>(defaultDate ?? new Date().toISOString().slice(0, 10));
    const [note, setNote] = useState("");

    const canSubmit = useMemo(() => {
        const a = Number(amount);
        return categoryId && !Number.isNaN(a) && a > 0 && /^\d{4}-\d{2}-\d{2}$/.test(date);
    }, [categoryId, amount, date]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit({ categoryId, amount: Number(amount), date, note: note.trim() || undefined });
    };

    return (
        <form className="w-full max-w-xl grid gap-3 " onSubmit={handleSubmit}>
            {/* Category */}
            <label className="form-control">
                <span className="label-text font-medium">Category</span>
                <select className="select select-primary bg-white" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </label>

            {/* Amount */}
            <label className="form-control ">
                <span className="label-text font-medium">Amount</span>
                <input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0.01"
                    className="input input-primary bg-white"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                />
            </label>

            {/* Date */}
            <label className="form-control">
                <span className="label-text font-medium">Date</span>
                <input type="date" className="input input-primary bg-white" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>

            {/* Note */}
            <label className="form-control">
                <span className="label-text font-medium">Note (optional)</span>
                <input
                    type="text"
                    className="input input-bordered bg-white"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g., Grocery run"
                />
            </label>

            {/* Actions */}
            <div className="mt-2 flex gap-2 justify-end">
                <button type="button" className="btn" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Add Expense
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
