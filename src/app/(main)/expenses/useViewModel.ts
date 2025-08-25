"use client";
import { toLocalISO } from "@/app/helpers";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addCategory, deleteCategory, selectCategoriesSorted, updateCategoryName } from "@/app/store/slice/categorySlice";
import { addExpense, selectTotalsForYear, selectDailyTotalsForMonth, selectAllExpenses } from "@/app/store/slice/expenseSlice";
import { useState, useMemo, useEffect, useCallback } from "react";

export const useViewModel = () => {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openExpenseModal, setOpenExpenseModal] = useState(false);

    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategoriesSorted);

    const MONTH_KEY = "expenses:selectedMonth";
    const YEAR_KEY = "expenses:selectedYear";

    // fallbacks
    const now = new Date();
    const fallbackMonth = now.toLocaleString("en-US", { month: "long" });
    const fallbackYear = String(now.getFullYear());

    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("en-US", { month: "long" })), []);
    const years = useMemo(() => Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - i)), []);

    // initialize from localStorage on first render (no flicker, controlled from start)
    const [selectedMonth, setSelectedMonth] = useState<string>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(MONTH_KEY) ?? fallbackMonth;
        }
        return fallbackMonth;
    });
    const [selectedYear, setSelectedYear] = useState<string>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(YEAR_KEY) ?? fallbackYear;
        }
        return fallbackYear;
    });

    const monthIdx = useMemo(() => months.indexOf(selectedMonth), [months, selectedMonth]);
    const dailySelector = useMemo(() => selectDailyTotalsForMonth(Number(selectedYear), monthIdx), [selectedYear, monthIdx]);
    const areaData = useAppSelector(dailySelector);
    // persist whenever it changes
    useEffect(() => {
        if (selectedMonth) localStorage.setItem(MONTH_KEY, selectedMonth);
    }, [selectedMonth]);

    useEffect(() => {
        if (selectedYear) localStorage.setItem(YEAR_KEY, selectedYear);
    }, [selectedYear]);

    useEffect(() => {
        if (selectedMonth && !months.includes(selectedMonth)) setSelectedMonth(fallbackMonth);
    }, [months, selectedMonth, fallbackMonth]);
    useEffect(() => {
        if (selectedYear && !years.includes(selectedYear)) setSelectedYear(fallbackYear);
    }, [years, selectedYear, fallbackYear]);

    const onAddCategory = (name: string) => {
        if (name.trim()) dispatch(addCategory(name));
    };
    const onRenameCategory = (id: string, name: string) => {
        if (name.trim()) dispatch(updateCategoryName({ id, name }));
    };
    const onDeleteCategory = (id: string) => {
        dispatch(deleteCategory({ id }));
    };
    const onAddExpense = (payload: { categoryId: string; amount: number; date: string; note?: string }) => {
        dispatch(addExpense(payload));
        setOpenExpenseModal(false);
    };

    const onAddExpensesBatch = useCallback(
        (payload: { categoryId: string; items: { amount: number; date: string; note?: string }[] }) => {
            const { categoryId, items } = payload;

            // Otherwise, dispatch one-by-one:
            items.forEach((it) => {
                dispatch(addExpense({ categoryId, amount: it.amount, date: it.date, note: it.note }));
            });

            setOpenExpenseModal(false);
        },
        [dispatch]
    );
    const categoriesById = useMemo(() => {
        const m = new Map<string, string>();
        categories.forEach((c) => m.set(c.id, c.name));
        return m;
    }, [categories]);

    const defaultExpenseDate = useMemo(() => {
        return toLocalISO(new Date()); // always today
    }, []);

    const totalsForYear = useAppSelector(selectTotalsForYear(Number(selectedYear)));
    return {
        openCategoryModal,
        setOpenCategoryModal,
        openExpenseModal,
        setOpenExpenseModal,
        months,
        years,
        selectedMonth,
        selectedYear,
        onMonthChange: (v: string) => setSelectedMonth(v),
        onYearChange: (v: string) => setSelectedYear(v),
        categories,
        categoriesById,
        onAddCategory,
        onRenameCategory,
        onDeleteCategory,
        onAddExpense,
        defaultExpenseDate,
        totalsForYear,
        onAddExpensesBatch,
        areaData,
    };
};
