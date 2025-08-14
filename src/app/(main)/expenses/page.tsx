"use client";
import React, { useState } from "react";

import MainContainer from "@/app/components/main-container";
import { areaChartData, barChartData } from "@/app/constants/chartData";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import DropDownSelect from "@/app/components/dropdown-select";
import CardHeader from "@/app/components/card-header";
import CardModalContainer from "@/app/components/card-modal-container";
import { useViewModel } from "./useViewModel";
import CategoryForm from "@/app/components/(forms)/category-form";
import PrimaryBtn from "@/app/components/(buttons)/primary-btn";
import ExpenseForm from "@/app/components/(forms)/expenses-form";

const ExpensesPage = () => {
    const {
        openCategoryModal,
        setOpenCategoryModal,
        openExpenseModal,
        setOpenExpenseModal,
        years,
        months,
        onMonthChange,
        onYearChange,
        selectedMonth,
        selectedYear,
        categories,
        categoriesById,
        onAddCategory,
        onRenameCategory,
        onDeleteCategory,
        onAddExpense,
        defaultExpenseDate,
        totalsForYear,
        onAddExpensesBatch,
    } = useViewModel();

    return (
        <MainContainer>
            {/* header */}
            <div className="bg-gray-100 p-2 h-full gap-2 flex flex-col">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
                </header>

                {/* filter */}
                <div className="py-2">
                    <div className="flex justify-between items-center mb-2">
                        {/* componentize this */}
                        <div className="flex space-x-4">
                            <PrimaryBtn onClick={() => setOpenCategoryModal(true)} btnText="+ Add Category" />
                            <PrimaryBtn onClick={() => setOpenExpenseModal(true)} btnText="+ Add Expense" />
                        </div>

                        <div className="flex gap-4">
                            <DropDownSelect
                                items={months}
                                value={selectedMonth}
                                onChange={(e) => {
                                    onMonthChange(e.target.value);
                                    e.target.blur();
                                }}
                                defaultLabel="Select Month"
                                className="select select-primary bg-transparent w-36 cursor-pointer"
                            />

                            <DropDownSelect
                                items={years}
                                value={selectedYear}
                                onChange={(e) => {
                                    onYearChange(e.target.value);
                                    e.target.blur();
                                }}
                                defaultLabel="Select Year"
                                className="select select-primary bg-transparent w-36 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <CardHeader headerText="Total Balance" subText="$3,250.00" />
                        <CardHeader headerText="Income" subText="+$4,000.00" subTextStyle="text-green-600" />
                        <CardHeader headerText="Expenses" subText="-$750.00" subTextStyle="text-red-600" />
                    </div>
                </div>

                {/* graphs */}
                <div className="bg-white rounded-xl mb-2  flex-2 flex flex-col lg:flex-row w-full ">
                    <div className="flex-1 flex justify-center items-center">
                        <AreaChart width={730} height={250} data={areaChartData}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </div>
                    <div className="flex-1 bg-green-200">
                        <ResponsiveContainer>
                            <BarChart width={600} height={300} data={barChartData}>
                                <XAxis dataKey="name" stroke="#8884d8" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <Bar dataKey="val" fill="#8884d8" barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bottom section: 1/3 height */}
                <div className="flex-1 bg-white rounded-xl shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Projects</h2>
                        <span className="text-sm text-green-500">30 done this month</span>
                    </div>
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="text-xs text-gray-500 uppercase">
                                <th className="py-2 px-3">Categories</th>
                                {months.map((month) => (
                                    <th key={month} className="py-2 px-3 text-right">
                                        {month}
                                    </th>
                                ))}
                                <th className="py-2 px-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {categories.map((cat) => {
                                const row = totalsForYear[cat.id] ?? Array(12).fill(0);
                                const fmt = (n: number) =>
                                    n ? n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—";
                                return (
                                    <tr key={cat.id} className="border-t">
                                        <td className="py-3 px-3 font-medium">{cat.name}</td>
                                        {row.map((val, i) => (
                                            <td key={i} className="py-3 px-3 text-right">
                                                {fmt(val)}
                                            </td>
                                        ))}
                                        <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                                            <button
                                                className="btn btn-xs"
                                                onClick={() => {
                                                    const next = prompt("Rename:", cat.name);
                                                    if (next != null) onRenameCategory(cat.id, next);
                                                }}
                                            >
                                                Rename
                                            </button>
                                            <button className="btn btn-xs btn-error" onClick={() => onDeleteCategory(cat.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <CardModalContainer open={openCategoryModal} onClose={() => setOpenCategoryModal(false)} title="Add Category">
                <CategoryForm onSubmit={onAddCategory} onClose={() => setOpenCategoryModal(false)} categories={categories} />
            </CardModalContainer>
            <CardModalContainer open={openExpenseModal} onClose={() => setOpenExpenseModal(false)} title="Add Expense" buttonText="Close">
                <ExpenseForm
                    categories={categories}
                    defaultDate={defaultExpenseDate}
                    onClose={() => setOpenExpenseModal(false)}
                    onSubmit={onAddExpensesBatch}
                />
            </CardModalContainer>
            {/* <div className="flex-1 bg-red-400 min-h-[500px]">All Expenses section here</div> */}
        </MainContainer>
    );
};

export default ExpensesPage;
