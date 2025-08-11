import React from "react";

interface DropDownSelectProps {
    items: string[];
    defaultLabel?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string | "";
}

const DropDownSelect = ({ items, defaultLabel, className, value, onChange }: DropDownSelectProps) => {
    return (
        <select value={value} defaultValue={defaultLabel} className={className} onChange={onChange} style={{ borderRadius: "0px" }}>
            <option disabled>{defaultLabel}</option>
            {items.map((item, idx) => (
                <option key={idx} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};

export default DropDownSelect;
