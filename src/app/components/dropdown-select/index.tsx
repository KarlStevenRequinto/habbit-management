import React from "react";

interface DropDownSelectProps {
    items: string[];
    defaultLabel?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropDownSelect = ({ items, defaultLabel, className, onChange }: DropDownSelectProps) => {
    return (
        <select
            defaultValue={defaultLabel}
            className={className}
            onChange={() => {
                onChange;
            }}
            style={{ borderRadius: "0px" }}
        >
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
