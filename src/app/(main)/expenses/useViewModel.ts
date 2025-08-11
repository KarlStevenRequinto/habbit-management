"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addCategory, deleteCategory, selectCategoriesSorted, updateCategoryName } from "@/app/store/slice/categorySlice";
import { useState, useMemo, useEffect } from "react";

export const useViewModel = () => {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openExpenseModal, setOpenExpenseModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<string>("");

    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategoriesSorted);

    const MONTH_KEY = "expenses:selectedMonth";
    const YEAR_KEY = "expenses:selectedYear";

    const now = new Date();
    const fallbackMonth = now.toLocaleString("en-US", { month: "long" });
    const fallbackYear = String(now.getFullYear());

    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("en-US", { month: "long" })), []);
    const years = useMemo(() => Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - i)), []);

    const onAddCategory = (name: string) => {
        if (name.trim()) dispatch(addCategory(name));
    };
    const onRenameCategory = (id: string, name: string) => {
        if (name.trim()) dispatch(updateCategoryName({ id, name }));
    };
    const onDeleteCategory = (id: string) => {
        dispatch(deleteCategory({ id }));
    };
    const categoriesById = useMemo(() => {
        const m = new Map<string, string>();
        categories.forEach((c) => m.set(c.id, c.name));
        return m;
    }, [categories]);

    useEffect(() => {
        const m = localStorage.getItem(MONTH_KEY) ?? fallbackMonth;
        const y = localStorage.getItem(YEAR_KEY) ?? fallbackYear;
        setSelectedMonth(m);
        setSelectedYear(y);
    }, []);

    // persist whenever it changes
    useEffect(() => {
        if (selectedMonth) localStorage.setItem(MONTH_KEY, selectedMonth);
    }, [selectedMonth]);

    useEffect(() => {
        if (selectedYear) localStorage.setItem(YEAR_KEY, selectedYear);
    }, [selectedYear]);

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
    };
};
