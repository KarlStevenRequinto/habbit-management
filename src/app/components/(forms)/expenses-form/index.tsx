"use client";
import React, { useMemo, useState } from "react";
import type { Category } from "@/app/store/slice/categorySlice";
import { nanoid } from "@reduxjs/toolkit";

type Draft = {
    uid: string; // local row id
    amount: string; // keep as string for the input
    date: string; // YYYY-MM-DD
    note: string;
};

type Props = {
    categories: Category[];
    onSubmit: (data: { categoryId: string; items: { amount: number; date: string; note?: string }[] }) => void;
    onClose: () => void;
    defaultCategoryId?: string;
    defaultDate?: string; // "YYYY-MM-DD" to prefill new rows (optional)
};

export default function ExpenseForm({ categories, onSubmit, onClose, defaultCategoryId, defaultDate }: Props) {
    const [categoryId, setCategoryId] = useState(defaultCategoryId ?? "");
    const mkDraft = () => ({
        uid: nanoid(),
        amount: "",
        date: defaultDate ?? new Date().toISOString().slice(0, 10),
        note: "",
    });
    const [rows, setRows] = useState<Draft[]>([mkDraft()]);
    const total = useMemo(
        () =>
            rows.reduce((sum, r) => {
                const n = parseFloat(r.amount);
                return sum + (Number.isFinite(n) ? n : 0);
            }, 0),
        [rows]
    );

    const addRow = () => setRows((prev) => [...prev, mkDraft()]);
    const removeRow = (uid: string) => setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.uid !== uid) : prev));

    const canSubmit = !!categoryId && rows.some((r) => r.amount.trim() && parseFloat(r.amount) > 0 && r.date.trim());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        const items = rows
            .map((r) => ({
                amount: parseFloat(r.amount),
                date: r.date,
                note: r.note.trim() ? r.note.trim() : undefined,
            }))
            .filter((x) => Number.isFinite(x.amount) && x.amount > 0 && x.date);

        if (!items.length) return;
        onSubmit({ categoryId, items });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl">
            {/* Category + Add Row button */}
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select className="select select-bordered w-full bg-white" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="" disabled>
                            Select category…
                        </option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="button" onClick={addRow} className="btn btn-outline" title="Add another expense row">
                    +
                </button>
            </div>

            {/* Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rows.map((r, idx) => (
                    <div key={r.uid} className="rounded-xl border p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">Item {idx + 1}</h4>
                            <button
                                type="button"
                                className="btn btn-ghost btn-xs"
                                onClick={() => removeRow(r.uid)}
                                disabled={rows.length === 1}
                                title="Remove this row"
                            >
                                Remove
                            </button>
                        </div>

                        <label className="block text-sm font-medium mb-1">Amount</label>
                        <input
                            inputMode="decimal"
                            step="0.01"
                            className="input input-bordered w-full mb-3 bg-white"
                            placeholder="0.00"
                            value={r.amount}
                            onChange={(e) => setRows((prev) => prev.map((row) => (row.uid === r.uid ? { ...row, amount: e.target.value } : row)))}
                        />

                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full mb-3 bg-white"
                            value={r.date}
                            onChange={(e) => setRows((prev) => prev.map((row) => (row.uid === r.uid ? { ...row, date: e.target.value } : row)))}
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Total: <span className="font-semibold">₱{total.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                    <button type="button" className="btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Add {rows.length > 1 ? "Expenses" : "Expense"}
                    </button>
                </div>
            </div>
        </form>
    );
}
