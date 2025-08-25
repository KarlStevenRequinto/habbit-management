import React from "react";
interface TitleHeaderProps {
    title: string;
}
const TitleHeader = ({ title }: TitleHeaderProps) => {
    return (
        <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </header>
    );
};

export default TitleHeader;
