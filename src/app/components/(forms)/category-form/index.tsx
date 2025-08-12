"use client";
import React, { useState } from "react";
import type { Category } from "@/app/store/slice/categorySlice";

type Props = {
    onSubmit: (name: string) => void;
    onClose: () => void;
    categories: Category[];
};

const CategoryForm = ({ onSubmit, onClose, categories }: Props) => {
    const [name, setName] = useState("");
    const [err, setErr] = useState<string | null>(null);

    const exists = (val: string) => categories.some((c) => c.name.toLowerCase() === val.trim().toLowerCase());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return setErr("Please enter a category name.");
        if (exists(trimmed)) return setErr("That category already exists.");

        onSubmit(trimmed); // dispatches addCategory in your VM
        setName("");
        onClose(); // close modal after add
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <label htmlFor="catName" className="block text-sm font-medium mb-1">
                Category name
            </label>
            <input
                id="catName"
                type="text"
                className="input input-primary input-md bg-transparent w-full"
                placeholder="e.g. Groceries"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setErr(null);
                }}
                autoFocus
            />
            {err && <p className="text-red-600 text-sm mt-2">{err}</p>}

            <div className="mt-4 flex justify-end gap-2">
                <button type="button" className="btn" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </div>
        </form>
    );
};
export default CategoryForm;
