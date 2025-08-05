import React from "react";

const ExpensesPage = () => {
    return (
        <div className="h-full w-full flex flex-col bg-red-100">
            {/* Top section: 2/3 height */}
            <div className="flex-2 flex flex-col lg:flex-row w-full">
                <div className="flex-1 bg-blue-200">Box 1</div>
                <div className="flex-1 bg-green-200">Box 2</div>
            </div>

            {/* Bottom section: 1/3 height */}
            <div className="flex-1 bg-yellow-200">Big Box Below</div>
        </div>
    );
};

export default ExpensesPage;
