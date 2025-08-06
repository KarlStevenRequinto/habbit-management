"use client";

import React from "react";
import MainContainer from "@/app/components/main-container";
import { areaChartData } from "@/app/constants/chartData";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const ExpensesPage = () => {
    return (
        <MainContainer>
            {/* Top section: 2/3 height */}
            <div className="flex-2 flex flex-col lg:flex-row w-full">
                <div className="flex-1">
                    <AreaChart width={730} height={250} data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                <div className="flex-1 bg-green-200">Box 2</div>
            </div>

            {/* Bottom section: 1/3 height */}
            <div className="flex-1 bg-yellow-200"></div>
        </MainContainer>
    );
};

export default ExpensesPage;
