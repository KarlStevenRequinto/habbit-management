import React from "react";

interface CardHeaderProps {
    headerText: string;
    subText: string;
    headerTextStyle?: string;
    subTextStyle?: string;
}

const CardHeader = ({ headerText, subText, headerTextStyle, subTextStyle }: CardHeaderProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className={`text-sm text-gray-500 mb-1 ${headerTextStyle}`}>{headerText}</h2>
            <p className={`text-xl font-semibold text-gray-800 ${subTextStyle}`}>{subText}</p>
        </div>
    );
};

export default CardHeader;
