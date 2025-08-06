import MainContainer from "@/app/components/main-container";
import React from "react";

const TodoPage = () => {
    return (
        <MainContainer>
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">+ Add Category</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">+ Add Expense</button>
                    </div>
                </header>

                {/* Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="text-sm text-gray-500 mb-1">Total Balance</h2>
                        <p className="text-xl font-semibold text-gray-800">$3,250.00</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="text-sm text-gray-500 mb-1">Income</h2>
                        <p className="text-xl font-semibold text-green-600">+$4,000.00</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="text-sm text-gray-500 mb-1">Expenses</h2>
                        <p className="text-xl font-semibold text-red-600">-$750.00</p>
                    </div>
                </section>

                {/* Chart Section (Placeholder) */}
                <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Spending Overview</h3>
                    <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">[ Chart goes here ]</div>
                </section>

                {/* Transactions Table */}
                <section className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h3>
                </section>
            </div>
        </MainContainer>
    );
};

export default TodoPage;
