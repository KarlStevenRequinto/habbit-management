import { createSlice, nanoid, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

export type Expense = {
    id: string;
    categoryId: string;
    amount: number; // positive
    date: string; // ISO "YYYY-MM-DD"
    note?: string;
};

type ExpensesState = { items: Expense[] };

const initialState: ExpensesState = { items: [] };

const monthShort = (i: number) => new Date(2000, i, 1).toLocaleString("en-US", { month: "short" }); // Jan..Dec

const daysInMonth = (year: number, monthIdx: number) => new Date(year, monthIdx + 1, 0).getDate();

const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addExpense: {
            prepare: (payload: Omit<Expense, "id">) => ({ payload: { ...payload, id: nanoid() } }),
            reducer: (state, action: PayloadAction<Expense>) => {
                state.items.push(action.payload);
            },
        },
        updateExpense: (state, action: PayloadAction<Expense>) => {
            const i = state.items.findIndex((e) => e.id === action.payload.id);
            if (i !== -1) state.items[i] = action.payload;
        },
        deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((e) => e.id !== action.payload.id);
        },
    },
});

export const { addExpense, updateExpense, deleteExpense } = expensesSlice.actions;
export const selectAllExpenses = (s: RootState) => s.expenses.items;

/**
 * Selector factory: totals per category per month for a given year.
 * Returns: Record<categoryId, number[12]>
 */
export const selectTotalsForYear = (year: number) =>
    createSelector([selectAllExpenses], (items) => {
        const out: Record<string, number[]> = {};
        for (const e of items) {
            const d = new Date(e.date);
            if (d.getFullYear() !== year) continue;
            const m = d.getMonth(); // 0..11
            if (!out[e.categoryId]) out[e.categoryId] = Array(12).fill(0);
            out[e.categoryId][m] += e.amount;
        }
        return out;
    });

export const selectDailyTotalsForMonth = (year: number, monthIdx: number) =>
    createSelector([selectAllExpenses], (items) => {
        if (!Number.isFinite(year) || monthIdx < 0 || monthIdx > 11) return [];
        const n = daysInMonth(year, monthIdx);
        const labelMon = monthShort(monthIdx);

        const rows = Array.from({ length: n }, (_, i) => ({
            day: i + 1,
            name: `${labelMon}-${i + 1}`,
            uv: 0,
        }));

        for (const e of items) {
            if (!e?.date) continue;

            const [y, m, d] = String(e.date).split("-").map(Number);
            if (y === year && m - 1 === monthIdx) {
                const idx = (d ?? 1) - 1;
                if (rows[idx]) rows[idx].uv += Number(e.amount) || 0;
            }
        }
        return rows;
    });

export default expensesSlice.reducer;
