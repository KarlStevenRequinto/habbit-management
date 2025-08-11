"use client";
import { useState } from "react";

export const useViewModel = () => {
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openExpenseModal, setOpenExpenseModal] = useState(false);

    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("en-US", { month: "long" }));

    return {
        openCategoryModal,
        setOpenCategoryModal,
        openExpenseModal,
        setOpenExpenseModal,
        years,
        months,
    };
};
